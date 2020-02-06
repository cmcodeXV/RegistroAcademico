import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Matricula} from '../models/matricula';
import {global} from './global';
import {tap} from 'rxjs/operators';

@Injectable()
export class MatriculaService{
    public url:string;

	constructor(
        private _http: HttpClient
	)
	{
         this.url = global.url;
	}
     private  _refrescarTabla = new Subject<void>();
    get refrescarTabla(){
        return this._refrescarTabla;
    }
	create(token, matricula): Observable<any>
	{
        let json = JSON.stringify(matricula);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url+'matricula', params, {headers: headers});
	}
    getMatriculas():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'matricula', {headers: headers});
    }
    getMatricula(id):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'matricula/'+id, {headers: headers});
    }

    update(token, matricula): Observable<any>{
        let json = JSON.stringify(matricula);
         let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.put(this.url+'matricula/'+matricula.id, params, {headers: headers});
    }
    
    deleteMatricula(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.delete(this.url+'matricula/'+id, {headers: headers}).pipe(tap(() => {
              this._refrescarTabla.next();
        })
        );
    }
}
