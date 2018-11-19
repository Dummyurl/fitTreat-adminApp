import { Component, OnInit } from '@angular/core';
import { CommonsvcService } from '../commonsvc.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-app-data-management',
  templateUrl: './app-data-management.component.html',
  styleUrls: ['./app-data-management.component.css']
})
export class AppDataManagementComponent implements OnInit {

  dataId:string = '';
  aboutUS:string = '';
  references:string='';
  constructor(public commonSvc:CommonsvcService,private matSnackBar:MatSnackBar) { 
    this.commonSvc.appDataFetch().subscribe(result=>{
      this.dataId = result[0]._id;
      this.aboutUS = result[0].aboutSection;
      document.getElementById("aboutSecDiv").innerHTML = this.aboutUS;
      this.references = result[0].references;
      document.getElementById("refSecDiv").innerHTML = this.references;
      
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    let obj = {
      aboutSection : this.aboutUS,
      references : this.references
    };

    this.commonSvc.updateAppData(obj,this.dataId).subscribe(result=>{
      this.matSnackBar.open("Success","OK")
      this.commonSvc.appDataFetch().subscribe(result=>{
        this.aboutUS = result[0].aboutSection;
        this.references = result[0].references;
        document.getElementById("aboutSecDiv").innerHTML = this.aboutUS;
        document.getElementById("refSecDiv").innerHTML = this.references;
      })
    },err=>{
      console.error(err);
    })
  }

}
