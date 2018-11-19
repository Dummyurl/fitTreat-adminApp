import { Component, OnInit, Inject,ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import {MatSnackBar} from '@angular/material';
import { MasterDataService } from '../master-data.service';
import { FormControl } from '@angular/forms';
import {Meal} from '../meal';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator,MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor( 
    private matSnackBar:MatSnackBar,
    public masterDataSvc:MasterDataService,
    public dialog:MatDialog) {
    this.mealCourseType.setValue([this.mealCourse[0]]);
  }
  ngOnInit() {
  }
  // To make Divs editable 
  editMode = false;

  //Menu Buttons activity
  toolBtnAddNew = true;
  toolBtnExisting = false;

  //Form Controls intialization
  mealCourseType = new FormControl();
  mealCourse=["Breakfast","Lunch","Dinner","Snack","Soup","Juice"];
  dietPref = ["Vegan","Vegetarian","Non-Vegetarian"];
  diet = {
    foodPreference:this.dietPref[0],
    ingredients:"",
    nutritionInfo:"",
    directions:"",
    dietType:"",
    avoidableMedCond:"",
    cuisine:"",
    photoURL:"",
    calories:0,
    name:"",
    course:""
  };

  files: any;
  mealsArray:Meal [];
  // HTML Editor drop-down initialize
  selected = "nutritionInfo";


  onResetPress(mealForm){
    mealForm.reset();
    this.mealCourseType.setValue([this.mealCourse[0]]);
    this.diet.foodPreference = this.dietPref[0];
    let nutInfo =  document.getElementById("nutritionInfoTxt");
    let ingrdInfo =  document.getElementById("ingredientsTxt");
    let drctnInfo = document.getElementById("directionsTxt");
    nutInfo.innerHTML = "Provide Nutrition Info text from HTML Editor";
    nutInfo.contentEditable = "false";
    ingrdInfo.innerHTML = "Provide Ingredients Info text from HTML Editor";
    ingrdInfo.contentEditable = "false";
    drctnInfo.innerHTML = "Provide Directions Info from HTML Editor";
    drctnInfo.contentEditable = "false";
  }
  /* Form Submission */

  onFormSubmit(mealForm){
    // Accessing diet model
    let diet = this.diet;
    let dietTypeArr = diet.dietType.split(",");
    let courseArr = this.mealCourseType.value
    let avoidableMedCondArr = diet.avoidableMedCond.split(",");
    
    let meal = new Meal();
    meal.avoidableMedCond = avoidableMedCondArr;
    meal.calories = diet.calories;
    meal.course = courseArr;
    meal.cuisine = diet.cuisine;
    meal.dietType = dietTypeArr;
    meal.directions = diet.directions;
    meal.foodPreference = diet.foodPreference;
    meal.ingredients = diet.ingredients;
    meal.name = diet.name;
    meal.nutritionInfo = diet.nutritionInfo;
    meal.photoURL = diet.photoURL;

    if(this.editMode){
      meal.nutritionInfo = document.getElementById("nutritionInfoTxt").innerHTML;
      meal.ingredients = document.getElementById("ingredientsTxt").innerHTML;
      meal.directions = document.getElementById("directionsTxt").innerHTML;
      this.masterDataSvc.updateMeal(meal).subscribe(data=>{
        this.onResetPress(mealForm);
        this.matSnackBar.open("Meal updated successfully","OK");
        this.editMode = false;
      },err=>{
        console.log(err);
        this.matSnackBar.open("Some Error Occurred :" + err,"OK");
      });
    }else{
      this.masterDataSvc.addNewMeal(meal).subscribe(data=>{
        this.onResetPress(mealForm);
        this.matSnackBar.open("Meal added successfully","OK");
      },err=>{
        console.log(err);
        this.matSnackBar.open("Some Error Occurred :" + err,"OK");
      })
    }
  }

  btnEditExstngPress(){
    this.editMode = true;
    this.toolBtnAddNew = false;
    this.toolBtnExisting = true;
    const dialogRef = this.dialog.open(MealsListDialog,{
      width:'700px',
      height:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      let dietRef = this.diet;
      this.mealCourseType.setValue(result.course);
      this.diet.foodPreference = this.dietPref[0];
      let nutInfo =  document.getElementById("nutritionInfoTxt");
      let ingrdInfo =  document.getElementById("ingredientsTxt");
      let drctnInfo = document.getElementById("directionsTxt");
      nutInfo.innerHTML = result.nutritionInfo;
      nutInfo.contentEditable = "true";
      ingrdInfo.innerHTML = result.ingredients;
      ingrdInfo.contentEditable = "true";
      drctnInfo.innerHTML = result.directions;
      drctnInfo.contentEditable = "true";

      dietRef.foodPreference = result.foodPreference;
      dietRef.dietType = result.dietType.toLocaleString();
      dietRef.avoidableMedCond = result.avoidableMedCond.toLocaleString();
      dietRef.cuisine = result.cuisine;
      let url = result.photoURL.split("/");
      dietRef.photoURL = url[url.length-1];
      dietRef.calories = result.calories;
      dietRef.name = result.name;
    });
  }

  btnAddNewPress(){
    this.toolBtnExisting = false;
    this.toolBtnAddNew = true;
  }

  htmlTextSubmit(selected){
    setTimeout(()=>{
      this.diet[selected] = document.getElementsByTagName("input")["htmlInp"].value;
      debugger;
      document.getElementById(selected+"Txt").innerHTML = this.diet[selected];
    },50);
  }
    
  fileChanged(e) {
    this.files = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.files);
    fileReader.onload = (evt:any) => {
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
 /*      this.dataPostSvc.uploadMealData(mealArray)
        .subscribe((data:any)=>{
          console.log(data);
          this.matSnackBar.open("Data Uploaded Successfully","OK");
        },
        err=>{
          console.error(err);
          this.matSnackBar.open(err,"OK");
        }); */
    }

    fileReader.onerror = (err) => {
      console.log("Error : " + err);
    }
    }

}

@Component({
  selector:'meals-list-dialog',
  templateUrl:'./meals_list.dialog.html',
  styles:[`
    .example-container {
      position: relative;
    }
    .example-loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0px;
      right: 0;
      background: rgba(0, 0, 0, 0.15);
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    tr.handleRowHover:hover{
      background-color:#f5f5f5 !important;
    }

    .deleteBtn, .editBtn{
      color: blue !important;
      text-decoration:underline !important;
      cursor:pointer !important
    }
  .deleteBtn:hover{
    color:red !important;
    text-decoration:underline;
  }

  `]
})
export class MealsListDialog{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data = new MatTableDataSource<Meal>();
  resultsLength = 0;
  isLoadingResults = false;
  constructor(public dialogRef: MatDialogRef<MealsListDialog>,
              public masterDataSvc: MasterDataService,
              public cnfDialog:MatDialog){}

    ngOnInit(){
      this.getMealsData(0,10);
      this.data.paginator = this.paginator;
    }

    getMealsData(skip:number,top:number){
      let data = this.masterDataSvc.getMealsList(skip,top)
        .subscribe(result=>{
          this.data.data = result;
        },err=>{
          console.error("Some error occurred : " + err);
        });
    }

    handleAction(element,action){
      if(action === 'edit'){
        this.dialogRef.close(element);
      }else{
      const cnfDialogRef = this.cnfDialog.open(ConfirmationDialog,{
      width:'auto',
      height:'auto'
      });

        cnfDialogRef.afterClosed().subscribe(result => {
          if(result === 'true'){
            this.masterDataSvc.deleteMeal(element.id);
          }
        });
      }
    }

}

@Component({
  selector:'app-confirmation-dialog',
  templateUrl:'../../../common/cnf_dialog_component.html',
  styles:[``]
})
export class ConfirmationDialog{
  constructor(public cnfDialogRef:MatDialogRef<ConfirmationDialog>){

  }
}
