import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Estudiante } from '../../../models/estudiante';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-estudiante-new',
  templateUrl: './estudiante-new.component.html',
  styleUrls: ['./estudiante-new.component.css'],
  providers: [UserService, EstudianteService]
})
export class EstudianteNewComponent implements OnInit {
	  public page_title: string;
    public identity;
    public token;
    public estudiante: Estudiante;
    public status: string;

  constructor(
       private _route: ActivatedRoute,
       private _router: Router,
       private _userService: UserService,
       private _estudianteService: EstudianteService
    ) { 
    this.page_title = 'Registro Estudiante';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.estudiante = new Estudiante(1,'','','','');

  }

  ngOnInit() {
  }
  onSubmit(form){
    this._estudianteService.create(this.token, this.estudiante).subscribe(
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
