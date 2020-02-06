import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import { MatriculaService } from '../../../services/matricula.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-matricula-list',
  templateUrl: './matricula-list.component.html',
  styleUrls: ['./matricula-list.component.css'],
  providers:[UserService, MatriculaService]
})
export class MatriculaListComponent implements OnInit {
    public page_title: string;
    public token;
    public url;
    public identity;
    isAdmin:boolean;
	  public matriculas;
    public status: string;
  constructor(
       private _userService: UserService,
       private _matriculaService: MatriculaService
  	) { 
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
  	    this.page_title = 'Lista Matricula';
        this.url = global.url;
  }

  ngOnInit() {

     this.getMatriculas();
     this.getisAdmin();
  }
  getisAdmin(){
    if(this.identity){
          if(this.identity.role == "ROLE_ADMIN")
           {
              this.isAdmin = true;
           }
         }
  }
   getMatriculas(){
     this._matriculaService.getMatriculas().subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.matriculas = response.matricula;
                }
            },
            error =>{
                console.log(error);
            }
       );
   }

   deleteMatricula(id){
     $('#myModal-'+id).modal('hide');
        this._matriculaService.deleteMatricula(this.token, id).subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.getMatriculas();
                }else{
                   alert('Error del Servidor');
                }
            },
            error =>{
               alert('Error del Servidor');
            }
       );
   }


}
