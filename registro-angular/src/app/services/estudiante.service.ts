import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Estudiante} from '../models/estudiante';
import {global} from './global';
import {tap} from 'rxjs/operators';

@Injectable()
export class EstudianteService{
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
	create(token, estudiante): Observable<any>
	{
        let json = JSON.stringify(estudiante);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url+'estudiante', params, {headers: headers});
	}
    getEstudiantes():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'estudiante', {headers: headers});
    }
    getEstudiante(id):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'estudiante/'+id, {headers: headers});
    }

    update(token, estudiante): Observable<any>{
        let json = JSON.stringify(estudiante);
         let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.put(this.url+'estudiante/'+estudiante.id, params, {headers: headers});
    }
    
    deleteEstudiante(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.delete(this.url+'estudiante/'+id, {headers: headers}).pipe(tap(() => {
              this._refrescarTabla.next();
        })
        );
    }
}