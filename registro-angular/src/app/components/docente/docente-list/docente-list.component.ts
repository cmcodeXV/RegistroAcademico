import { Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import { DocenteService } from '../../../services/docente.service'; 
import { global } from '../../../services/global';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css'],
  providers:[UserService, DocenteService]
})
export class DocenteListComponent implements OnInit {
    public page_title: string;
    public token;
    public url;
	  public docentes;
    public status: string;
  constructor(
       private _userService: UserService,
       private _docenteService: DocenteService
  	) { 
        this.token = this._userService.getToken();
  	    this.page_title = 'Lista Docentes';
        this.url = global.url;
        
  }

  ngOnInit() {
     this._docenteService.refrescarTabla.subscribe(() => {
          this.getDocentes();
     });
     this.getDocentes();
  }
  
   getDocentes(){
     this._docenteService.getDocentes().subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.docentes = response.docente;
                }
            },
            error =>{
                console.log(error);
            }
       );
   }

   deleteDocente(id){
     $('#myModal-'+id).modal('hide');
        this._docenteService.deleteDocente(this.token, id).subscribe(
            response =>{
                if(response.status == 'success')
                {
                   this._docenteService.refrescarTabla.subscribe(() => {
                        this.getDocentes();
                   });
                  
                }else{
                   alert('Error del Servidorrrr');
                }
            },
            error =>{
               alert('Error del Servidor');
            }
       );
   }

}
