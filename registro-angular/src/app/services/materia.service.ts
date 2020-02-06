import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Materia} from '../models/materia';
import {global} from './global';
import {tap} from 'rxjs/operators';

@Injectable()
export class MateriaService{
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
	create(token, materia): Observable<any>
	{
        let json = JSON.stringify(materia);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.post(this.url+'materia', params, {headers: headers});
	}
    getMaterias():Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'materia', {headers: headers});
    }
    getMateria(id):Observable<any>
    {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url+'materia/'+id, {headers: headers});
    }

    update(token, materia): Observable<any>{
        let json = JSON.stringify(materia);
         let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.put(this.url+'materia/'+materia.id, params, {headers: headers});
    }
    
    deleteMateria(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.delete(this.url+'materia/'+id, {headers: headers}).pipe(tap(() => {
              this._refrescarTabla.next();
        })
        );
    }
}