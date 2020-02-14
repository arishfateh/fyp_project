import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { StayPoint } from '../model/stay-point.model';

@Injectable({
  providedIn: 'root'
})
export class StayPointService {


  routelist: AngularFireList<any>;
  selectedRoute: StayPoint = new StayPoint();

  constructor(private firebase: AngularFireDatabase) { }


  getdata() {
    this.routelist = this.firebase.list("stayPoint");
    return this.routelist;

  }


  insert(route: StayPoint) {
    this.routelist = this.firebase.list('/stayPoint');
    this.routelist.push({

      DepartureCity: route.DepartureCity,
      DestinationCity: route.DestinationCity,
      StopOverCity: route.StopOverCity,
      Priority: route.Priority,
    })
  }



  update(route: StayPoint) {
    this.routelist.update(route.ID,
      {
        DepartureCity: route.DepartureCity,
        DestinationCity: route.DestinationCity,
        StopOverCity: route.StopOverCity,
        Priority: route.Priority,
      })
  }

  delete(id: string) {
    this.routelist.remove(id);
  }
}

