import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import { MateriaService } from '../../../services/materia.service'; 
import { global } from '../../../services/global';

@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.component.html',
  styleUrls: ['./materia-list.component.css'],
  providers:[UserService, MateriaService]
})
export class MateriaListComponent implements OnInit {
    public page_title: string;
    public token;
    public identity;
    public url;
   	public materias;
     isAdmin:boolean;
    public status: string;
  constructor(
       private _userService: UserService,
       private _materiaService: MateriaService
  	) { 
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
  	    this.page_title = 'Lista Materia';
        this.url = global.url;
       
  }
   
  ngOnInit() {
       this.getMaterias();
  }
   getMaterias(){
     this._materiaService.getMaterias().subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.materias = response.materias;
                }
            },
            error =>{
                console.log(error);
            }
       );
   }

   deleteMateria(id){
     $('#myModal-'+id).modal('hide');
        this._materiaService.deleteMateria(this.token, id).subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.getMaterias();
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