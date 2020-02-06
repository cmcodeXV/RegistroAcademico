import { Component, OnInit , DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { global } from '../../../services/global';

import { UserService } from '../../../services/user.service';
import { DocenteService } from '../../../services/docente.service';
import { Docente } from '../../../models/docente';


@Component({
  selector: 'app-docente-edit',
  templateUrl: '../docente-new/docente-new.component.html',
  styleUrls: ['./docente-edit.component.css'],
  providers: [UserService, DocenteService]
})
export class DocenteEditComponent implements OnInit {
  public page_title: string;
    public token;
    public docente: Docente;
        public url:string;
    public status: string;
   constructor(
       private _route: ActivatedRoute,
       private _router: Router,
       private _userService: UserService,
       private _docenteService: DocenteService
    ) { 
    this.page_title = 'Editar Docenet';
    this.token = this._userService.getToken();
    this.url = global.url;
    
  }


  ngOnInit() {
   
    this.getDocente();
  }
//Rellenar objeto usuario en el Formulario
  getDocente(){
    this._route.params.forEach((params: Params) => {
          let id = params['id'];

            this._docenteService.getDocente(id).subscribe(
               response=>{ 
                  if(!response.docente)
                  {
                     this._router.navigate(['/list-docentes']);
                  }
                  else{
                     this.docente = response.docente;
                  }
               },
               error =>{
                  console.log(<any>error);
                  this._router.navigate(['/list-docentes']);
               }
            );
        }
      );
  }
  
  onSubmit(form){
    this._docenteService.update(this.token, this.docente).subscribe(
            response => {
            if(response.status =='success')
            {
              this.docente = response.docente;
              this.status = 'success';
              this._router.navigate(['/list-docentes']);
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
