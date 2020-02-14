import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { TransportService } from 'src/app/services/transport.service';
import { DomSanitizer } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Rooms } from 'src/app/model/rooms.model';
import { RoomType } from 'src/app/model/room-type.model';
import { TransportType } from 'src/app/model/transport-type.model';
import { Itinerary } from 'src/app/model/itinerary.model';
import { ItineraryDays } from 'src/app/model/itinerary-days.model';
import { AttractionPoint } from 'src/app/model/attraction-point.model';
import { AttractionPointService } from 'src/app/services/attraction-point.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { City } from 'src/app/model/city.model';
import { CityService } from 'src/app/services/city.service';


@Component({
  selector: 'app-itinerary-add',
  templateUrl: './itinerary-add.component.html',
  styleUrls: ['./itinerary-add.component.css']
})
export class ItineraryAddComponent implements OnInit {



  exampleForm: FormGroup;

  public itinerary: Itinerary;

  public itinerarytype: ItineraryDays;


  public RoomServices: Array<string>;

  public TransportName: string;
  public Capacity: number;
  public Price: number;


  validation_messages = {
    'NoOfDays': [
      { type: 'required', message: 'No Of Days is required.' }
    ],
    'Destination': [
      { type: 'required', message: 'Destination is required.' }
    ],

    'PriceBracket': [
      { type: 'required', message: 'Price Bracket is required.' },
    ],
    'GroupType': [
      { type: 'required', message: 'GroupType is required.' },
    ],
    'NoOfPeople': [
      { type: 'required', message: 'No Of People is required.' },
    ],
    'TotalCost': [
      { type: 'required', message: 'TotalCost is required.' },
    ],

  };


  public isavailable: Array<string> = ['true', 'false'];

  public pricebracket: Array<string> = ['Budget', 'Economy', 'Premium'];

  public grouptype: Array<string> = ['Friends', 'Family', 'Couple', 'Single Traveller'];

  public add1: string;
  public allactivities: Array<AttractionPoint>;

  public selectedactivities: Array<AttractionPoint> = [];


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public itineraryService: ItineraryService,
    public attractionService: AttractionPointService,
    public cityService: CityService,


    private sanitizer: DomSanitizer, private snackBar: MatSnackBar

  ) {


  }

  public routeList: City[];
  ngOnInit() {
    this.itinerary = new Itinerary;

    this.getcityData();
    this.createForm();
    this.getDataAttractions();
  }
  public checking: number = 0;
  public disp: string = null;
  public check: number = 0;
  public len: number;

  ngAfterViewChecked() {
    if (this.routeList && this.check == 0) {
      this.len = this.routeList.length;
      this.check = 1;

    }
    if (this.routeList) {
      if (this.routeList.length > 0 && this.checking == 0) {
        console.log(this.routeList)

        this.checking = 1;
      }
      if (this.allactivities) {
        if (this.allactivities.length > 0 && this.checking == 1) {
          this.checking = 2;
          this.disp = "csdc";
        }
      }

    }
  }
  getcityData() {


    this.cityService.getAllCity().subscribe(data => {
      this.routeList = data;
    })


  }


  createForm() {
    this.exampleForm = this.fb.group({
      NoOfDays: ['', Validators.required],
      Destination: ['', Validators.required],
      PriceBracket: ['', Validators.required],
      GroupType: ['', Validators.required],
      NoOfPeople: ['', Validators.required],
      TotalCost: ['', Validators.required],

    });

  }

  resetFields() {

    this.exampleForm = this.fb.group({
      NoOfDays: new FormControl('', Validators.required),
      Destination: new FormControl('', Validators.required),
      PriceBracket: new FormControl('', Validators.required),
      GroupType: new FormControl('', Validators.required),
      NoOfPeople: new FormControl('', Validators.required),
      TotalCost: new FormControl('', Validators.required),


    });
  }


  onSubmit(value: Itinerary) {

    console.log("in save");
    let ret = false;
    if (this.itinerary.todo.length > 0) {
      //this.user.permissions = this.SelectedTags;
    }
    else {
      this.snackBar.open('Enter ToDo list', null, {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      ret = true;
    }

    if (ret) {
      return;
    }
    if (ret == false) {



      this.itinerary.Destination = value.Destination;
      this.itinerary.GroupType = value.GroupType;
      this.itinerary.NoOfDays = value.NoOfDays;
      this.itinerary.NoOfPeople = value.NoOfPeople;
      this.itinerary.PriceBracket = value.PriceBracket;
      this.itinerary.TotalCost = value.TotalCost;


      console.log(this.itinerary);
      // this.itineraryService.insert(this.itinerary);
      this.resetFields();
      this.resetrooms();
      this.snackBar.open("Itinerary added successfully", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.itinerary = new Itinerary;
    }
  }
  public resetting: string;
  public cansave: string;

  Addcheck() {
    if (this.startcity != "" && this.endcity != "" && this.staycity != "" && this.dayno != null && this.selectedactivities.length > 0) {
      this.add1 = "dsda";
      console.log("efasda");
    }
    else {
      console.log(this.staycity, this.endcity, this.staycity, this.dayno, this.selectedactivities.length);
    }
  }

  public staycity: string;
  public startcity: string;
  public endcity: string;
  public dayno: number;
  public activity: AttractionPoint;
  public activityArray: Array<AttractionPoint>;

  addroomtype() {

    this.itinerarytype = new ItineraryDays;
    this.itinerarytype.Activity = this.selectedactivities;
    this.itinerarytype.DayNo = this.dayno;
    this.itinerarytype.EndCity = this.endcity;
    this.itinerarytype.StartCity = this.startcity;
    this.itinerarytype.StayCity = this.staycity;

    // this.itinerary.todo.push(this.itinerarytype); on



    // this.hotel.TransportType.push(this.rooms);
    //if (this.hotel.TransportType[this.hotel.TransportType.length - 1].RoomServices.length === this.SelectedTags2.length) 
    {
      console.log("in transport type", this.itinerarytype);
      console.log("transport", this.itinerary);
      //this.resetrooms();
      this.resetting = "true";
      this.cansave = "true";
      this.add1 = null;


    }
  }
  ontodoDelete(item) {
    const index = this.itinerary.todo.indexOf(item);
    if (index >= 0) {
      this.itinerary.todo.splice(index, 1);
    }
  }


  resetrooms() {
    this.dayno = null;
    this.startcity = "";
    this.staycity = "";
    this.endcity = "";

    //this.SelectedTags2 = [];

    this.resetting = null;
    this.selectedactivities = [];

  }


  // ngAfterViewChecked() {
  //   if (this.attractionList && this.check == 0) {
  //     this.len = this.attractionList.length;
  //     this.check = 1;
  //   }
  // }
  getDataAttractions() {

    this.attractionService.getAllAttractionPoints().subscribe(data => {
      this.allactivities = data;
    })

  }

  selectactivity(op) {
    console.log("selectactivity", op);
    this.selectedactivities.push(op);
    this.Addcheck();
  }

  // const index = this.SelectedTags.indexOf(fruit);

  // if (index >= 0) {
  //   this.SelectedTags.splice(index, 1);
  // }


  onActivityDelete(item) {
    const index = this.selectedactivities.indexOf(item);
    if (index >= 0) {
      this.selectedactivities.splice(index, 1);
    }
  }


}





