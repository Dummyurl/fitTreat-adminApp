import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AppConstants} from './app-constants';
import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonsvcService {

  baseUrl:string = AppConstants.baseUrl;
  constructor(private http:HttpClient) { }

  private handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
        console.error('An error occurred: ',error.error.message);
    }else{
      console.error(
        `Backend returned code ${error.status},` + `body was: ${error.error}`
      ); 
    }
    return throwError('Something bad happened; please try again later');
  }

  appDataFetch():any{
    return this.http.get(this.baseUrl+'/api/getAppData')
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadMealData(meals:any[]){
    return this.http.post(this.baseUrl+'/admin/addMeal',meals)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAppData(obj:any,id:string){
    return this.http.put(this.baseUrl+'/admin/editAppData/'+id,obj)
      .pipe(
        catchError(this.handleError)
      );
  }
}
