import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements  OnInit, DoCheck{
  public title = 'Registro Academico';
  public identity;
  public token;
  public url;
  isAdmin:boolean;
  
  constructor(
       private _userService: UserService

  	){
        this.loadUser();
        this.url = global.url;
   }
   ngOnInit(){
   }

   ngDoCheck(){
      this.loadUser();
   }
   
   loadUser(){//Actualizar la barra de navegacion
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.isAdmin = this._userService.isAdmin;
   }
  
}
