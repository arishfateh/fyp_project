import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Breakpoints } from '../model/breakpoints.model';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  routelist: AngularFireList<any>;
  selectedRoute: Breakpoints = new Breakpoints();

  constructor(private firebase: AngularFireDatabase) { }

  getdata() {
    this.routelist = this.firebase.list("BreakPoints");
    return this.routelist;

  }
  insert(route: Breakpoints) {
    console.log(route);
    this.routelist = this.firebase.list('/BreakPoints');
    this.routelist.push({

      StartPoint: route.StartPoint,
      EndPoint: route.EndPoint,
      Time: route.Time,
      Priority: route.Priority,
      StopType: route.StopType,
    })
  }
  update(route: Breakpoints) {
    this.routelist.update(route.ID,
      {
        StartPoint: route.StartPoint,
        EndPoint: route.EndPoint,
        Time: route.Time,
        Priority: route.Priority,
        StopType: route.StopType,

      })
  }
  delete(id: string) {
    this.routelist.remove(id);
  }

}
