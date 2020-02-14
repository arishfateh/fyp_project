import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { FixedTransport } from '../model/fixed-transport.model';

@Injectable({
  providedIn: 'root'
})
export class FixedTransportService {

  routelist: AngularFireList<any>;
  selectedRoute: FixedTransport = new FixedTransport();

  constructor(private firebase: AngularFireDatabase) { }
  getdata() {
    this.routelist = this.firebase.list("fixedTransport");
    return this.routelist;

  }
  insert(route: FixedTransport) {
    console.log(route);
    this.routelist = this.firebase.list('/fixedTransport');
    this.routelist.push({

      City: route.City,
      NoOfVehicles: route.NoOfVehicles,
      VendorName: route.VendorName,
      VendorPhoneNo: route.VendorPhoneNo,
      Price: route.Price,
      StartPoint: route.StartPoint,
      EndPoint: route.EndPoint
    })
  }
  update(route: FixedTransport) {
    this.routelist.update(route.ID,
      {
        City: route.City,
      NoOfVehicles: route.NoOfVehicles,
      VendorName: route.VendorName,
      VendorPhoneNo: route.VendorPhoneNo,
      Price: route.Price,
      StartPoint: route.StartPoint,
      EndPoint: route.EndPoint

      })
  }
  delete(id: string) {
    this.routelist.remove(id);
  }

}
