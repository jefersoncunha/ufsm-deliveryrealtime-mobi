import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleSearch provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DemandsSearch {
  data1: any;
  constructor(public http: Http) {
    console.log('Hello PeopleSearch Provider');
  }

  load() {
    if (this.data1) {
      return Promise.resolve(this.data1);
    }

    return new Promise(resolve => {
      this.http.get('https://ufsm-deliveryrealtime-api.herokuapp.com/api/deliveries.json')
        .map(res => res.json())
        .subscribe(data => {
          console.log("GET",data);
          this.data1 = data;
          resolve(this.data1);
        });
    });
  }



}
