import { Injectable } from '@angular/core';
//import { Dealer } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AttractionPoint } from '../model/attraction-point.model';
import axios from 'axios'
//import 'rxjs/add/operator/map'



@Injectable({
  providedIn: 'root'
})
export class AttractionPointService {


  uri = 'http://localhost:3000/attractionpoint';
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

  public addAtr(attraction: AttractionPoint): void {

    this.http.post(`${this.uri}/add`, attraction)
      .subscribe(res => console.log('Done'));

  }

  public getAllAttractionPoints() {
    // const dealers: Array<Dealer> = (this.http.get(`${this.uri}/getAllDealers`));
    // let dealer: Array<Dealer> = _.clon(this.http.get(`${this.uri}/getAllDealers`));

    //return this.http.get(`${this.uri}/getAllDealers`).pipe(map((response: any) => response.json()));
    return this.http.get<AttractionPoint[]>(`${this.uri}/getAllAttraction`)


  }

  async getAttractionPoint(id: number, prop: AttractionPoint) {
    await axios.get(`${this.uri}/getAttractionPoint/${id}`).
      then((res) => prop = res.data)

    return prop


  }

  public addcitylocal(iti: AttractionPoint[]) {
    localStorage.setItem('attractionpoints', JSON.stringify(iti));
    console.log("done");
  }

  public deleteAttractionPoint(id) {
    return this
      .http
      .delete(`${this.uri}/delete/${id}`);
  }
  public updateAttractionPoint(id, obj: AttractionPoint) {
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
