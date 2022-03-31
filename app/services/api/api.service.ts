import { Injectable } from '@angular/core';
import { loginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders    } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HeroI } from 'src/app/models/hero.interface';
import { TheTeamI } from 'src/app/models/theteam.interface';
import { SearchI } from 'src/app/models/search.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://challenge-react.alkemy.org/";
  url2:string = "api.php/5322963081056175/"

  constructor( private http: HttpClient) { }

  loginByEmail(form:any):Observable<ResponseI>{
    
    let direccion = this.url;
    return this.http.post<ResponseI>(direccion,form)
                    .pipe(catchError(this.errorHandler));

  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.error || "Server Error");
  }

  public  getAllHeroes(id:number):Observable<HeroI>{
    let direccion = this.url2 + id
    return this.http.get<HeroI>(direccion)
  }

  public  getTheTeam(id:number):Observable<HeroI[]>{
    let direccion = this.url2 + id
    return this.http.get<HeroI[]>(direccion)
  }

  searchHero(name:string):Observable<SearchI>{
    let direccion = this.url2 + 'search/' + name;
    return this.http.get<SearchI>(direccion)
  }
}
