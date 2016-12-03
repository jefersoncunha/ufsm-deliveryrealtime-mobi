import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';

import { Http } from '@angular/http';



import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;


  constructor(public zone: NgZone, public http: Http) {
  }


  postLocation(){

    var link = 'http://localhost:8100/api/positions';
    var data = {
      "position":{
        "user_id": 10,
        "delivery_id": 10,
        "latitude": -29.7053926,
        "longitude": -53.7352695
      }
    };

    this.http.post(link, data)
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);

    }, error => {
        console.log("Oooops!");
    });
  }

  startTracking() {

    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    BackgroundGeolocation.configure((location) => {

      console.log('SendLocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

     }, (err) => {

      console.log(err);

    }, config);

    // Turn ON the background-geolocation system.
    BackgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {


      var link = 'http://localhost:8100/api/positions';
      var data = {
        "position":{
          "user_id": 1,
          "delivery_id": 12,
          "latitude": position.coords.latitude,
          "longitude": position.coords.longitude
        }
      };

      this.http.post(link, data)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log("Oooops!");
      });

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

      // postLocation(position.coords.latitude,position.coords.longitude);


    });

  }

  stopTracking() {

    console.log('stopTracking');

    BackgroundGeolocation.finish();
    this.watch.unsubscribe();

  }


  // sendTracker() {
  //     var link = 'https://ufsm-deliveryrealtime-api.herokuapp.com/api/positions';
  //     var data = JSON.stringify(
  //       {
  //         user_id: 1,
  //         delivery_id: 2,
  //         latitude: -20.20,
  //         longitude: 30
  //
  //       }
  //   );
  //
  //     Http.post(link, data)
  //     .subscribe(data => {
  //       console.log(data);
  //     }, error => {
  //         console.log("Oooops!");
  //     });
  // }

}
