import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Transport } from '../model/transport.model';

@Injectable({
  providedIn: 'root'
})
export class TransportService {


  routelist: AngularFireList<any>;
  selectedRoute: Transport = new Transport();

  constructor(private firebase: AngularFireDatabase) { }


  getdata() {
    this.routelist = this.firebase.list("transport");
    return this.routelist;

  }



  insert(route: Transport) {
    this.routelist = this.firebase.list('/transport');
    this.routelist.push({

      City: route.City,
      NoOfVehicles: route.NoOfVehicles,
      VendorName: route.VendorName,
      VendorPhoneNo: route.VendorPhoneNo,
      TransportType: route.TransportType,
      PriceType: route.PriceType,

    })
  }



  update(route: Transport) {
    this.routelist.update(route.ID,
      {
        City: route.City,
        NoOfVehicles: route.NoOfVehicles,
        VendorName: route.VendorName,
        VendorPhoneNo: route.VendorPhoneNo,
        TransportType: route.TransportType,
        PriceType: route.PriceType,
      })
  }

  delete(id: string) {
    this.routelist.remove(id);
  }
}

