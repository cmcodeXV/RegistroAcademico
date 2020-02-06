import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';
import {tap} from 'rxjs/operators';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;
    isAdmin:boolean;
	constructor(
        public _http: HttpClient
	)
	{
         this.url = global.url;

	}
    private  _refrescarTabla = new Subject<void>();
    get refrescarTabla(){
        return this._refrescarTabla;
    }
    test(){
    	return "Hola mundo";
    }
    register(user): Observable<any>
    {
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'user', params, {headers: headers});
    }
    
    signup(user, gettoken = null): Observable<any>
    {
        if(gettoken != null)
        {
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'user/login', params, {headers: headers});
    }
    
    update(token, user): Observable<any>{
         let json = JSON.stringify(user);
         let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.put(this.url+'user/'+user.id, params, {headers: headers});
    }

    getIdentity(){
         let identity = JSON.parse(localStorage.getItem('identity'));
         if(identity && identity != "undefined")
         {
            this.identity = identity;
        
            if(this.identity.role == "ROLE_ADMIN")
            {
                  this.isAdmin = true;
            }
         }
         else{
             this.identity = null;
         }

         return this.identity;
    }

    getToken(){
         let token = localStorage.getItem('token');
        if(token != "undefined")
        {
            this.token = token;
        }
        else{
            this.token = null;
        }
         return this.token;
    }
    
    getUsers():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'user', {headers: headers});
    }
    getUser(id):Observable<any>
    {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'user/'+id, {headers: headers});
    }
    deleteUser(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.delete(this.url+'user/'+id, {headers: headers}).pipe(tap(() => {
              this._refrescarTabla.next();
        })
        );
    }
}
