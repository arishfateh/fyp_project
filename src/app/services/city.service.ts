import { Injectable } from '@angular/core';
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
export class CityService {


  uri = 'http://localhost:3000/city';
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

  public addCity(cit: City): void {

    this.http.post(`${this.uri}/add`, cit)
      .subscribe(res => console.log('Done'));

  }

  public getAllCity() {
    // const dealers: Array<Dealer> = (this.http.get(`${this.uri}/getAllDealers`));
    // let dealer: Array<Dealer> = _.clon(this.http.get(`${this.uri}/getAllDealers`));

    //return this.http.get(`${this.uri}/getAllDealers`).pipe(map((response: any) => response.json()));
    return this.http.get<City[]>(`${this.uri}/getAllCity`)


  }

  async getCity(id: number, prop: City) {
    await axios.get(`${this.uri}/getCity/${id}`).
      then((res) => prop = res.data)

    return prop


  }


  public addcitylocal(iti: City[]) {
    localStorage.setItem('city', JSON.stringify(iti));
    console.log("done");
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
