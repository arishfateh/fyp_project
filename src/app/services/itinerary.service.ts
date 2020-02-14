/*import { Injectable } from '@angular/core';
//import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Itinerary } from '../model/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  routelist: AngularFireList<any>;
  selectedRoute: Itinerary = new Itinerary();

  constructor(private firebase: AngularFireDatabase) { }


  getdata() {
    this.routelist = this.firebase.list("itinerary");
    return this.routelist;

  }



  insert(route: Itinerary) {
    this.routelist = this.firebase.list('/itinerary');
    this.routelist.push({


      NoOfDays: route.NoOfDays,
      Destination: route.Destination,
      PriceBracket: route.PriceBracket,
      GroupType: route.GroupType,
      NoOfPeople: route.NoOfPeople,
      TotalCost: route.TotalCost,
      todo: route.todo,

    })
  }



  update(route: Itinerary) {
    this.routelist.update(route.ID,
      {

        NoOfDays: route.NoOfDays,
        Destination: route.Destination,
        PriceBracket: route.PriceBracket,
        GroupType: route.GroupType,
        NoOfPeople: route.NoOfPeople,
        TotalCost: route.TotalCost,
        todo: route.todo,
      })
  }

  delete(id: string) {
    this.routelist.remove(id);
  }
}

*/
import { Injectable } from '@angular/core';
//import { Dealer } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AttractionPoint } from '../model/attraction-point.model';
import axios from 'axios'
import { Itinerary } from '../model/itinerary.model';
import { JsonPipe } from '@angular/common';
//import 'rxjs/add/operator/map'


@Injectable({
  providedIn: 'root'
})
export class ItineraryService {


  uri = 'http://localhost:3000/itinerary';
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

  public addItinerary(cit: Itinerary): any {
    var a;
    this.http.post(`${this.uri}/add`, cit)
      .subscribe(res => { console.log((res)); }
      );
    console.log(a)
    return a;
  }


  public additnerarylocal(iti: Itinerary) {
    localStorage.setItem('itinerary', JSON.stringify(iti));
    console.log("done");
  }

  public getAllItinerary() {
    // const dealers: Array<Dealer> = (this.http.get(`${this.uri}/getAllDealers`));
    // let dealer: Array<Dealer> = _.clon(this.http.get(`${this.uri}/getAllDealers`));

    //return this.http.get(`${this.uri}/getAllDealers`).pipe(map((response: any) => response.json()));
    return this.http.get<Itinerary[]>(`${this.uri}/getAllItinerary`)


  }
  /*
    async getCity(id: number, prop: City) {
      await axios.get(`${this.uri}/getCity/${id}`).
        then((res) => prop = res.data)
  
      return prop
  
  
    }
  
  
    public deleteCity(id) {
      return this
        .http
        .delete(`${this.uri}/delete/${id}`);
    }
    public updateCity(id, obj: City) {
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
