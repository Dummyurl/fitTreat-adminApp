import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-route-test',
  templateUrl: './route-test.component.html',
  styleUrls: ['./route-test.component.css']
})
export class RouteTestComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navBack(){
    this.router.navigateByUrl('home');
  }

}
