import { Component, OnInit , DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { global } from '../../../services/global';

import { UserService } from '../../../services/user.service';
import { MateriaService } from '../../../services/materia.service';
import { Materia } from '../../../models/materia';


@Component({
  selector: 'app-materia-edit',
  templateUrl: '../materia-new/materia-new.component.html',
  styleUrls: ['./materia-edit.component.css'],
  providers: [UserService, MateriaService]
})
export class MateriaEditComponent implements OnInit {

public page_title: string;
		public token;
		public materia: Materia;
        public url:string;
		public status: string;
   constructor(
       private _route: ActivatedRoute,
       private _router: Router,
       private _userService: UserService,
       private _materiaService: MateriaService
  	) { 
    this.page_title = 'Editar Materia';
    this.token = this._userService.getToken();
    this.url = global.url;
    
  }


  ngOnInit() {
   
    this.getMateria();
  }
//Rellenar objeto usuario en el Formulario
  getMateria(){
    this._route.params.forEach((params: Params) => {
          let id = params['id'];

            this._materiaService.getMateria(id).subscribe(
               response=>{ 
                  if(!response.materia)
                  {
                     this._router.navigate(['/list-materias']);
                  }
                  else{
                     this.materia = response.materia;
                  }
               },
               error =>{
                  console.log(<any>error);
                  this._router.navigate(['/list-materias']);
               }
            );
        }
      );
  }
  
  onSubmit(form){
    this._materiaService.update(this.token, this.materia).subscribe(
            response => {
            if(response.status =='success')
            {
              this.materia = response.materia;
              this.status = 'success';
              this._router.navigate(['/list-materias']);
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
