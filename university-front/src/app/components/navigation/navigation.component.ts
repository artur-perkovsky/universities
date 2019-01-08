import { Component, OnInit } from '@angular/core';
import {Pair} from "../../utils/pair";
import {Tabs} from "../tabs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  tabs: Pair [] = Tabs.get();

  constructor() { }

  ngOnInit() {
  }

}
