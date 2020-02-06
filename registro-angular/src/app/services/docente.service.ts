import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Docente} from '../models/docente';
import {global} from './global';
import {tap} from 'rxjs/operators';

@Injectable()
export class DocenteService{
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
	create(token, docente):Observable<any>
	{
        let json = JSON.stringify(docente);
        let params = 'json='+json;
         console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
       console.log(headers);
        return this._http.post(this.url+'docente', params, {headers: headers});
	}
    getDocentes():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'docente', {headers: headers});
    }
    getDocente(id):Observable<any>
    {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'docente/'+id, {headers: headers});
    }

    update(token, docente): Observable<any>{
        let json = JSON.stringify(docente);
         let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.put(this.url+'docente/'+docente.id, params, {headers: headers});
    }
    
    deleteDocente(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.delete(this.url+'docente/'+id, {headers: headers}).pipe(tap(() => {
              this._refrescarTabla.next();
        })
        );
    }
}