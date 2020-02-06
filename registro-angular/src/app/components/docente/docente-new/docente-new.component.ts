import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DocenteService } from '../../../services/docente.service';
import { Docente } from '../../../models/docente';

@Component({
  selector: 'app-docente-new',
  templateUrl: './docente-new.component.html',
  styleUrls: ['./docente-new.component.css'],
  providers: [UserService, DocenteService]
})
export class DocenteNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public docente: Docente;
  public status: string;
  constructor(
       private _route: ActivatedRoute,
       private _router: Router,
       private _userService: UserService,
       private _docenteService: DocenteService
  	) { 
    this.page_title = 'Registrar Docente';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this._userService.getToken());
    this.docente = new Docente(1,'','','','');

  }

  ngOnInit() {
  }
  
  onSubmit(form){
    this._docenteService.create(this.token, this.docente).subscribe(
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
