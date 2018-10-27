import {
  Component,
  OnInit
} from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import {
  DataPostService
} from '../data-post.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor(private dataPostSvc: DataPostService, private matSnackBar:MatSnackBar) {}

  ngOnInit() {}

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
