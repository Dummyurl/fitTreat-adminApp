import { Component, OnInit,ViewChild} from '@angular/core';
import { MasterDataService } from '../master-data.service';
import {MatPaginator,MatTableDataSource,MatSort} from '@angular/material';

@Component({
  selector: 'app-medicine-comp',
  templateUrl: './medicine-comp.component.html',
  styleUrls: ['./medicine-comp.component.css']
})
export class MedicineCompComponent implements OnInit {

  medFilter = '';
  dataSource:any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private masterDataSvc:MasterDataService) {
    this.getMedData();
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  getMedData() : any{
    this.masterDataSvc.getAllMedicines().subscribe((meds:any[])=>{
      this.dataSource = meds;
   })
 }

}

