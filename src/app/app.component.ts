import { Component, Input, OnInit } from '@angular/core';
import {ConfigService} from './config.service';
import {AppConstants} from './app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'FitTreat - Admin Console';
  busy = false;

  constructor(public configSvc: ConfigService) {}

  ngOnInit() {
    this.configSvc.getConfig().subscribe(result => {
      AppConstants.baseUrl = result.url;
    });
  }
}
