import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {AppConstants} from '../app-constants';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  baseUrl:string = AppConstants.baseUrl;
  constructor(private http:HttpClient) { }
  /* Error Handler */
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

  /* Method to fetch all the medicines */
  getAllMedicines(){
    return this.http.get(this.baseUrl+'/admin/getAllMeds')
      .pipe(catchError(this.handleError));
  }

  /* Method to add medicines */

  postMedicines(meds:any[]){
    return this.http.post(this.baseUrl+'/admin/addMeal',meds)
      .pipe(
        catchError(this.handleError)
      );
  }

  /* Method to fetch list of meals */

  getfirst50Meals(){
    return this.http.get(this.baseUrl+'/admin/get50Meals')
      .pipe(catchError(this.handleError));
  }
}
