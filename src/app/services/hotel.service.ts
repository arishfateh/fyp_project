import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Rooms } from '../model/rooms.model';
//import { Dealer } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AttractionPoint } from '../model/attraction-point.model';
import axios from 'axios'
import { City } from '../model/city.model';
//import 'rxjs/add/operator/map'
//import { uriGlobal } from './conf';

@Injectable({
  providedIn: 'root'
})
export class HotelService {


  uri = 'http://localhost:3000/hotel';
  //uri = '/city';

  constructor(private http: HttpClient) { }

  public getheader() {
    var a = localStorage.getItem("currentUser");
    a.split(',', 2);
    a = a.substr(24, (a.length));
    a = a.substr(1, (a.length - 1));
    a = a.substr(0, (a.length - 2));

    //console.log(a);
    return a;
  }

  public addHotel(cit: Rooms): void {

    this.http.post(`${this.uri}/add`, cit)
      .subscribe(res => console.log('Done'));

  }

  public getAllHotels() {
    // const dealers: Array<Dealer> = (this.http.get(`${this.uri}/getAllDealers`));
    // let dealer: Array<Dealer> = _.clon(this.http.get(`${this.uri}/getAllDealers`));

    //return this.http.get(`${this.uri}/getAllDealers`).pipe(map((response: any) => response.json()));
    return this.http.get<City[]>(`${this.uri}/getAllHotel`)


  }
  /*
    async getCity(id: number, prop: City) {
      await axios.get(`${this.uri}/getCity/${id}`).
        then((res) => prop = res.data)
  
      return prop
  
  
    }
  
  
    public addcitylocal(iti: City[]) {
      localStorage.setItem('city', JSON.stringify(iti));
      console.log("done");
    }
  */

  public deleteHotel(id) {
    return this
      .http
      .delete(`${this.uri}/delete/${id}`);
  }
  public updateHotel(id, obj: City) {
    console.log("aya");
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
  /*
    public checkperm(inp: string) {
      var tok = this.getheader();
      if (tok) {
        var userpayload = atob(tok.split('.')[1]);
  
        // console.log(userpayload);
        //string[] aa=userpayload;
        if (userpayload.match(inp)) {
          //console.log("mil gya");
          return true;
        }
        else {
          return false;
        }
      }
    }*/
}


/*
routelist: AngularFireList<any>;
selectedRoute: Rooms = new Rooms();

constructor(private firebase: AngularFireDatabase) { }


getdata() {
  this.routelist = this.firebase.list("hotel");
  return this.routelist;

}

public addcitylocal(iti: Rooms[]) {
  localStorage.setItem('hotel', JSON.stringify(iti));
  console.log("done");
}

insert(route: Rooms) {
  this.routelist = this.firebase.list('/hotel');
  this.routelist.push({

    City: route.City,
    HotelName: route.HotelName,
    NoOfRooms: route.NoOfRooms,
    VendorName: route.VendorName,
    VendorPhoneNo: route.VendorPhoneNo,
    HotelServices: route.HotelServices,
    roomTypes: route.roomTypes,

  })
}



update(route: Rooms) {
  this.routelist.update(route.ID,
    {
      City: route.City,
      HotelName: route.HotelName,
      NoOfRooms: route.NoOfRooms,
      VendorName: route.VendorName,
      VendorPhoneNo: route.VendorPhoneNo,
      HotelServices: route.HotelServices,
      roomTypes: route.roomTypes,
    })
}

delete(id: string) {
  this.routelist.remove(id);
}
}

*/