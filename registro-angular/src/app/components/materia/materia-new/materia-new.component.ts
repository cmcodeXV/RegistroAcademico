import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Materia } from '../../../models/materia';

import { MateriaService } from '../../../services/materia.service';

@Component({
  selector: 'app-materia-new',
  templateUrl: './materia-new.component.html',
  styleUrls: ['./materia-new.component.css'],
  providers:[UserService, MateriaService]
})
export class MateriaNewComponent implements OnInit {
      public page_title: string;
	  public identity;
	  public token;
	  public materia: Materia;
    public status: string;

  constructor(
  	   private _route: ActivatedRoute,
       private _router: Router,
       private _userService: UserService,
       private _materiaService: MateriaService
  	) { 
    this.page_title = 'Registro Materia';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.materia = new Materia(1,'');

  	}

  ngOnInit() {
  }

  onSubmit(form){
    this._materiaService.create(this.token, this.materia).subscribe(
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
