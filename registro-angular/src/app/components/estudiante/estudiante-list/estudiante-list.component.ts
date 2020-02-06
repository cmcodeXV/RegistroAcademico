import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import { EstudianteService } from '../../../services/estudiante.service'; 
import { global } from '../../../services/global';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.css'],
  providers:[UserService, EstudianteService]
})
export class EstudianteListComponent implements OnInit {
	public page_title: string;
    public token;
    public url;
	public estudiantes;
    public status: string;
  constructor(
       private _userService: UserService,
       private _estudianteService: EstudianteService
  	) { 
        this.token = this._userService.getToken();
  	    this.page_title = 'Lista Estudiante';
        this.url = global.url;
  }

  ngOnInit() {

     this.getEstudiantes();

  }

   getEstudiantes(){
     this._estudianteService.getEstudiantes().subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.estudiantes = response.estudiantes;
                     
                }
            },
            error =>{
                console.log(error);
            }
       );
   }

   deleteEstudiante(id){
     $('#myModal-'+id).modal('hide');
        this._estudianteService.deleteEstudiante(this.token, id).subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.getEstudiantes();
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
