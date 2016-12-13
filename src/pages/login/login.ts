import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {Page} from 'ionic-framework/ionic';
import { Demands } from '../demands/demands';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  demands = Demands;
  constructor(public navCtrl: NavController) {
  }


}
