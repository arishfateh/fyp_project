import { Injectable } from '@angular/core';
//import { Dealer } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AttractionPoint } from '../model/attraction-point.model';
import axios from 'axios'
import { City } from '../model/city.model';
import { Route } from '../model/route.model';
//import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class ForallService {

  uri = 'http://localhost:3000/route';
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

  public addRoute(cit: Route): void {

    this.http.post(`${this.uri}/add`, cit)
      .subscribe(res => console.log('Done'));

  }

  public getAllRoutes() {
    // const dealers: Array<Dealer> = (this.http.get(`${this.uri}/getAllDealers`));
    // let dealer: Array<Dealer> = _.clon(this.http.get(`${this.uri}/getAllDealers`));

    //return this.http.get(`${this.uri}/getAllDealers`).pipe(map((response: any) => response.json()));
    return this.http.get<Route[]>(`${this.uri}/getAllRoute`)


  }

  async getRoute(id: number, prop: Route) {
    await axios.get(`${this.uri}/getRoute/${id}`).
      then((res) => prop = res.data)

    return prop


  }


  public deleteRoute(id) {
    return this
      .http
      .delete(`${this.uri}/delete/${id}`);
  }
  public updateRoute(id, obj: Route) {
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
