import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[UserService]
})
export class UserListComponent implements OnInit {
    public page_title: string;
    public token;
    public url;
	  public users;
    public status: string;
  constructor(
       private _userService: UserService
  	) { 
        this.token = this._userService.getToken();
  	    this.page_title = 'Lista Docentes';
        this.url = global.url;
        
  }

  ngOnInit() {
     this._userService.refrescarTabla.subscribe(() => {
          this.getUsuarios();
     });
     this.getUsuarios();
     console.log(this._userService.getUsers());
  }
  
   getUsuarios(){
     this._userService.getUsers().subscribe(
            response =>{
                if(response.status == 'success')
                {
                    this.users = response.users;
                }
            },
            error =>{
                console.log(error);
            }
       );
   }

   deleteUser(id){
     $('#myModal-'+id).modal('hide');
        this._userService.deleteUser(this.token, id).subscribe(
            response =>{
                if(response.status == 'success')
                {
                   this._userService.refrescarTabla.subscribe(() => {
                        this.getUsuarios();
                   });
                  
                }else{
                   alert('Error del Servidorrrr');
                }
            },
            error =>{
               alert('Error del Servidor');
            }
       );
   }

}