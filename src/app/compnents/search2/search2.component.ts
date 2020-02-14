import { Component, OnInit, Inject } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CityService } from 'src/app/services/city.service';
import { ForallService } from 'src/app/services/forall.service';
import { AttractionPointService } from 'src/app/services/attraction-point.service';
import { ItineraryService } from 'src/app/services/itinerary.service';

import { Days } from 'src/app/model/days'

import { City } from 'src/app/model/city.model';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from 'src/app/model/route.model';
import { AttractionPoint } from 'src/app/model/attraction-point.model';
import { __values } from 'tslib';
import { Routes, RouterLink } from '@angular/router';
import { ThrowStmt, IfStmt } from '@angular/compiler';
import { Itinerary } from 'src/app/model/itinerary.model';
import { Router, NavigationEnd } from '@angular/router';
import { ItineraryDays } from 'src/app/model/itinerary-days.model';
import { parse } from 'querystring';
import { JsonPipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';


export interface DialogData {
  animal: Array<any>;
  images: Array<any>;
}

class galleryall {
  p1: any;
  p2: any;
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {


  public tempme: Array<any> = [];
  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  onNoClick(): void {
    this.dialogRef.close();

    //this.data.animal=this.tempme;
  }

  public save(imi) {
    console.log("fe", imi);
    this.snackBar.open("image added", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    this.tempme.push(imi);
    this.data.animal.push(imi);
    this.dialogRef.close()

  }

}


@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css']
})
export class Search2Component implements OnInit {


  constructor(public dialog: MatDialog, public attractionService: AttractionPointService, public itineraryService: ItineraryService, ) { }

  public display = null;
  public itinerary: Itinerary = new Itinerary();

  public tempitinerary: Itinerary = new Itinerary();

  public argument: Array<AttractionPoint> = [];

  animal: Array<any>;
  name: string;
  public attractionList: AttractionPoint[] = [];


  public dataget: Array<any> = [];

  getattractionData() {


    this.attractionService.getAllAttractionPoints().subscribe(data => {
      this.attractionList = data;
    })
    this.attractionList.forEach(value => {
      //console.log(value, 'daasd')
    })


  }

  openDialog(imi): void {

    this.argument = this.attractionList.filter(a => a.City == imi.cityname)
    console.log(this.argument);
    // console.log(this.imgshow, this.imgshow
    // .length);
    // for (var i = 0; i < this.imgshow.length; i++) {

    //   this.argument.push({ p1: this.imgshow[i], p2: this.tempgall[i] })

    // }

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {


      data: { images: this.argument, animal: this.dataget }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = this.dataget;
      console.log(this.dataget, '1');

      console.log(imi);
      var aa = this.itinerary.todo[imi.Dayno].AttractionPoints.find(a => a.AttractionName == this.dataget[0].AttractionName)
      if (!aa) {
        console.log("change huwa")
        this.itinerary.todo[imi.Dayno].AttractionPoints.push(this.dataget[0]);
      }
      console.log(this.itinerary.todo)
      this.itineraryService.additnerarylocal(this.itinerary);
      this.dataget = []
      // for (var i = 0; i < this.dataget.length; i++) {
      //   this._handleReaderLoaded2(this.dataget[i]);
      /*
    for(var j=0;j<this.imgshow.length;j++)
    {
      if(this.imgshow[j]===this.dataget[i])
      {
        )
        this._handleReaderLoaded2(this.showgallery[j].imgsrcs);
    //this.imgsrcs.push(this.dataget[i]);
   }*/
      //
      console.log(this.dataget, '1');

      //}
    });

  }

  public check: number = 0;
  public len: number;
  public checking: number = 0;
  public disp: string = null;

  ngAfterViewChecked() {
    if (this.attractionList && this.check == 0) {

      this.check = 1;

    }
    if (this.attractionList) {
      if (this.attractionList.length > 0 && this.checking == 0) {
        //    console.log(this.cityList)
        this.disp = "csdc";
        this.checking = 1;



      }
    }
  }

  ngOnInit() {

    this.getattractionData();
    let Itinerary: Array<Itinerary> = JSON.parse(localStorage.getItem('itinerary'));
    console.log(Itinerary);
    this.tempitinerary.Destination = Itinerary["Destination"];
    this.tempitinerary.GroupType = Itinerary["GroupType"];
    this.tempitinerary.ID = Itinerary['ID'];
    this.tempitinerary.NoOfDays = Itinerary["NoOfDays"];
    this.tempitinerary.NoOfPeople = Itinerary["NoOfPeople"];
    this.tempitinerary.PriceBracket = Itinerary["PriceBracket"];
    this.tempitinerary.TotalCost = Itinerary["TotalCost"];
    this.tempitinerary.todo = Itinerary['todo'];

    console.log(this.tempitinerary);

    if (this.tempitinerary.todo.length > 0) {
      this.display = "dw";
      this.itinerary = this.tempitinerary;
    }

  }

  search() {
    console.log("sf")
    this.display = "sdcd";
  }
  changeattraction(imi) {
    console.log(imi)
    this.openDialog(imi);
  }

  getCost() {
    this.itineraryService.addItinerary(this.itinerary);

  }
  public number: number = 0;
  public displaystaypoints: string = null;
  public staypointsname: Array<string> = [];
  changestay(imi) {
    console.log(imi);
    if (this.number == 0) {
      this.displaystaypoints = "csd";
      this.number = 1;
      for (var i = 0; i < imi.CurrentRoute.length; i++) {
        this.staypointsname.push(imi.CurrentRoute[i].EndPoint)
      }
      this.staypointsname.findIndex(a => a != imi.cityname);
      console.log(this.staypointsname)
      var ind1 = this.staypointsname.findIndex(a => a == imi.cityname);
      console.log(ind1)
      if (ind1 > 0)
        this.staypointsname.splice(ind1);
      console.log(this.staypointsname);
      // this.staypointsname.find()


    }
    else {
      this.displaystaypoints = null;
      this.number = 0
      this.staypointsname = []
    }

  }

  public deleteattr: Array<string> = []
  public displattr: string = null;
  deleteattraction(imi) {
    console.log(imi)
    for (var i = 0; i < imi.AttractionPoints.length; i++) {
      this.deleteattr.push(imi.AttractionPoints[i].AttractionName)
    }
    this.displattr = "a";
  }

  deletingattr(it, item) {
    console.log(it, item)
    var as = this.itinerary.todo.findIndex(a => a == item)
    var ass = this.itinerary.todo[as].AttractionPoints.findIndex(a => a.AttractionName == it)
    console.log(ass)
    this.itinerary.todo[as].AttractionPoints.splice(ass, 1)
    this.displattr = null;
    this.deleteattr = [];
  }


  public tempproute: Array<Route> = [];
  public tempproute2: Array<Route> = [];
  public flag: number = 0;

  changestaypoint(im, imi) {
    console.log(im, imi)
    //imi.cityname = im;
    var ind = (this.itinerary.todo.findIndex(a => a == imi));
    this.itinerary.todo[ind].cityname = im;
    this.itinerary.todo[ind].AttractionPoints = []
    this.itinerary.todo[ind].AttractionPoints = this.attractionList.filter(a => a.City == this.itinerary.todo[ind].cityname)
    if (this.itinerary.todo[ind].AttractionPoints.length > 1) {
      this.itinerary.todo[ind].AttractionPoints.splice(this.itinerary.todo[ind].AttractionPoints.length - 1)
    }

    for (var i = 0; i < this.itinerary.todo[ind].CurrentRoute.length; i++) {
      if (this.itinerary.todo[ind].CurrentRoute[i].EndPoint == im) {
        if (this.flag == 0) {
          this.tempproute.push(this.itinerary.todo[ind].CurrentRoute[i])
          this.flag = 1;
        }


      }
      else {
        if (this.flag == 0) {
          this.tempproute.push(this.itinerary.todo[ind].CurrentRoute[i])
        }
      }
      if (this.flag == 1 && this.itinerary.todo[ind].CurrentRoute[i].EndPoint != im) {
        this.tempproute2.push(this.itinerary.todo[ind].CurrentRoute[i]);
      }
    }
    this.itinerary.todo[ind].CurrentRoute = this.tempproute;
    console.log(this.tempproute);

    if (this.itinerary.todo[ind + 1]) {
      this.itinerary.todo[ind + 1].fromcity = im;
      for (var i = 0; i < this.itinerary.todo[ind + 1].CurrentRoute.length; i++) {
        this.tempproute2.push(this.itinerary.todo[ind + 1].CurrentRoute[i])
      }
      this.itinerary.todo[ind + 1].CurrentRoute = this.tempproute2;
    }
    console.log(this.itinerary);
    this.displaystaypoints = null;
    this.flag = 0;
    this.tempproute = [];
    this.tempproute2 = []
  }

  reset() {
    window.location.reload();

  }
}
