import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Matricula } from '../../../models/matricula';

import { MatriculaService } from '../../../services/matricula.service';
import { MateriaService } from '../../../services/materia.service';
import { DocenteService } from '../../../services/docente.service';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-matricula-edit',
  templateUrl: '../matricula-new/matricula-new.component.html',
  providers:[UserService, MatriculaService,MateriaService,DocenteService,EstudianteService]
})
export class MatriculaEditComponent implements OnInit {
      public page_title: string;
	  public identity;
	  public token;
	  public matricula: Matricula;
      public docentes;
      public materias;
      public estudiantes;
      public status: string;

  constructor(
  	   private _route: ActivatedRoute,
       private _router: Router,
       private _userService: UserService,
       private _matriculaService:MatriculaService,
       private _materiaService: MateriaService,
       private _docenteService:DocenteService,
       private _estudianteService:EstudianteService
  	) { 
    this.page_title = 'Editar Matricula';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  	}
    ngOnInit() {
    this.getDocentes();
    this.getEstudiantes();
    this.getMaterias();
    this.getMatricula();
  }
  getMatricula(){
    this._route.params.forEach((params: Params) => {
          let id = params['id'];

            this._matriculaService.getMatricula(id).subscribe(
               response=>{ 
                  if(!response.matricula)
                  {
                     this._router.navigate(['/list-matriculas']);
                  }
                  else{
                     this.matricula = response.matricula;
                  }
               },
               error =>{
                  console.log(<any>error);
                  this._router.navigate(['/list-matriculas']);
               }
            );
        }
      );
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

   onSubmit(form){
    this._matriculaService.update(this.token, this.matricula).subscribe(
            response => {
            if(response.status =='success')
            {
            	console.log(response);
              this.matricula = response.matricula;
              this.status = 'success';
              this._router.navigate(['/list-matriculas']);
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
