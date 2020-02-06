import { Component, OnInit , DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { global } from '../../../services/global';

import { UserService } from '../../../services/user.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../models/estudiante';


@Component({
  selector: 'app-estudiante-edit',
  templateUrl: '../estudiante-new/estudiante-new.component.html',
  styleUrls: ['./estudiante-edit.component.css'],
  providers: [UserService, EstudianteService]
})
export class EstudianteEditComponent implements OnInit {
  public page_title: string;
		public token;
		public estudiante: Estudiante;
        public url:string;
		public status: string;
   constructor(
       private _route: ActivatedRoute,
       private _router: Router,
       private _userService: UserService,
       private _estudianteService: EstudianteService
  	) { 
    this.page_title = 'Editar Estudiante';
    this.token = this._userService.getToken();
    this.url = global.url;
    
  }


  ngOnInit() {
   
    this.getEstudiante();
  }
//Rellenar objeto usuario en el Formulario
  getEstudiante(){
    this._route.params.forEach((params: Params) => {
          let id = params['id'];

            this._estudianteService.getEstudiante(id).subscribe(
               response=>{ 
                  if(!response.estudiante)
                  {
                     this._router.navigate(['/list-estudiantes']);
                  }
                  else{
                     this.estudiante = response.estudiante;
                  }
               },
               error =>{
                  console.log(<any>error);
                  this._router.navigate(['/list-estudiantes']);
               }
            );
        }
      );
  }
  
  onSubmit(form){
    this._estudianteService.update(this.token, this.estudiante).subscribe(
            response => {
            if(response.status =='success')
            {
              this.estudiante = response.estudiante;
              this.status = 'success';
              this._router.navigate(['/list-estudiantes']);
            }
            else{
              this.status = 'error';
            }
         },
         error =>
         {
           this.status = 'error';
           console.log(<any>error);
         }
      );
  }
}
