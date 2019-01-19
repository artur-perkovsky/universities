import { Component, OnInit } from '@angular/core';
import {Pair} from "../../utils/pair";
import {Tabs} from "../navigation/tabs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabs: Pair [] = Tabs.get();

  constructor() { }

  ngOnInit() {
  }

}
