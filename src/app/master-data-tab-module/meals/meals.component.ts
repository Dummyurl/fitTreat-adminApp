import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import {DataPostService} from '../../data-post.service';
import {MatSnackBar} from '@angular/material';
import { MasterDataService } from '../master-data.service';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit,AfterViewInit {

  @ViewChild('htmlInp') txtArea:ElementRef;
  
  ngAfterViewInit(){

  }
  
  mealCourseType = new FormControl();
  mealCourse=["Breakfast","Lunch","Dinner","Snack","Soup","Juice"];

  dietPref = ["Vegan","Vegetarian","Non-Vegetarian"];
  diet = {
    foodPreference:this.dietPref[0],
    ingredients:"",
    nutritionInfo:"",
    directions:""
  };
    //this.diet["selectedValue"] = this.dietPref[0];
  mealsArray:any = [];
  editable = false;
  selected = "nutritionInfo";
  constructor(private dataPostSvc: DataPostService, private matSnackBar:MatSnackBar,private masterDataSvc:MasterDataService) {
    this.mealCourseType.setValue([this.mealCourse[0]]);
    this.getMealsData();
  }
  ngOnInit() {
  }
  htmlTextSubmit(selected){
    setTimeout(()=>{
      this.diet[selected] = document.getElementsByTagName("input")["htmlInp"].value
      document.getElementById(selected+"Txt").innerHTML = this.diet[selected];
    },50);
  }
  
  getMealsData() {
    this.masterDataSvc.getfirst50Meals().subscribe((meals:any[])=>{
      this.mealsArray = meals;
    });
  }

  files: any;
  fileChanged(e) {
    this.files = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.files);
    fileReader.onload = (evt) => {
      let data = new Uint8Array(evt.target.result);
      let workbook = XLSX.read(data, {
        type: "array",
        cellDates: true,
        cellNF: false,
        cellText: false
      });
      let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
      let mealArray = [];
      $.each(jsonData, (i, v) => {
        let jsonObj = {
          name: v.name,
          cuisine: v.cuisine,
          calories: v.calories,
          servingSize: v.servingSize,
          nutritionInfo: v.nutritionInfo,
          ingredients: v.ingredients,
          directions: v.directions,
          photoURL: v.photoURL
        };
        if (v["foodPreference"]) {
          jsonObj["foodPreference"] = v["foodPreference"].split(',');
        }
        if (v["dietType"]) {
          jsonObj["dietType"] = v["dietType"].split(',');
        }
        if (v["idealMedCond"]) {
          jsonObj["idealMedCond"] = v["idealMedCond"].split(',');
        }
        if (v["avoidableMedCond"]) {
          jsonObj["avoidableMedCond"] = v["avoidableMedCond"].split(',');
        }
        if (v["course"]) {
          jsonObj["course"] = v["course"].split(',');
        }
        mealArray.push(jsonObj);
      });
      this.dataPostSvc.uploadMealData(mealArray)
        .subscribe((data:any)=>{
          console.log(data);
          this.matSnackBar.open("Data Uploaded Successfully","OK");
        },
        err=>{
          console.error(err);
          this.matSnackBar.open(err,"OK");
        });
    }

    fileReader.onerror = (err) => {
      console.log("Error : " + err);
    }
    }

}
