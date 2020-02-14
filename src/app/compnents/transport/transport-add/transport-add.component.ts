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
import { Transport } from 'src/app/model/transport.model';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/model/city.model';


@Component({
  selector: 'app-transport-add',
  templateUrl: './transport-add.component.html',
  styleUrls: ['./transport-add.component.css']
})
export class TransportAddComponent implements OnInit {


  exampleForm: FormGroup;

  public hotel: Transport;
  public rooms: TransportType;

  public RoomServices: Array<string>;

  public TransportName: string;
  public Capacity: number;
  public Price: number;


  validation_messages = {
    'City': [
      { type: 'required', message: 'City is required.' }
    ],
    'NoOfVehicles': [
      { type: 'required', message: 'No Of Vehicles is required.' }
    ],

    'VendorName': [
      { type: 'required', message: 'Vendor Name is required.' },
    ],
    'VendorPhoneNo': [
      { type: 'required', message: 'Vendor PhoneNo is required.' },
    ],
    'PriceType': [
      { type: 'required', message: 'PriceType is required.' },
    ],


  };


  public isavailable: Array<string> = ['true', 'false'];

  public add1: string;


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public transportService: TransportService,
    public cityService: CityService,
    private sanitizer: DomSanitizer, private snackBar: MatSnackBar

  ) {


  }
  public routeList: City[];
  ngOnInit() {
    this.getcityData();
    this.hotel = new Transport;

    this.createForm();
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
        this.disp = "csdc";
        this.checking = 1;
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
      City: ['', Validators.required],
      NoOfVehicles: ['', Validators.required],
      VendorName: ['', Validators.required],
      VendorPhoneNo: ['', Validators.required],
      PriceType: ['', Validators.required],

    });


  }



  resetFields() {

    this.exampleForm = this.fb.group({
      City: new FormControl('', Validators.required),
      NoOfVehicles: new FormControl('', Validators.required),
      NoOfRooms: new FormControl('', Validators.required),
      VendorName: new FormControl('', Validators.required),
      VendorPhoneNo: new FormControl('', Validators.required),
      PriceType: new FormControl('', Validators.required),


    });
    this.hotel.TransportType = [];
  }


  onSubmit(value: Transport) {


    console.log("in save");
    let ret = false;
    if (this.hotel.TransportType.length > 0) {
      //this.user.permissions = this.SelectedTags;
    }
    else {
      this.snackBar.open('enter Transport Type', null, {
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


      this.hotel.City = value.City;
      this.hotel.NoOfVehicles = value.NoOfVehicles;
      this.hotel.VendorName = value.VendorName;
      this.hotel.VendorPhoneNo = value.VendorPhoneNo;
      this.hotel.PriceType = value.PriceType;


      console.log(this.hotel);
      this.transportService.insert(this.hotel);
      this.resetFields();
      this.resetrooms();
      this.snackBar.open("Transport added successfully", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });

    }
  }
  public resetting: string;
  public cansave: string;

  Addcheck() {
    if (this.TransportName !== "" && this.Price != null && this.Capacity != null) {
      this.add1 = "dsda";
      console.log("efasda");
    }
  }

  addroomtype() {
    this.rooms = new TransportType;
    this.rooms.Capacity = this.Capacity;
    this.rooms.Price = this.Price;
    this.rooms.TransportName = this.TransportName;
    this.hotel.TransportType.push(this.rooms);
    //if (this.hotel.TransportType[this.hotel.TransportType.length - 1].RoomServices.length === this.SelectedTags2.length) 
    {
      console.log("in transport type", this.rooms);
      console.log("transport", this.hotel);
      //this.resetrooms();
      this.resetting = "true";
      this.cansave = "true";
      this.add1 = null;
    }
  }


  resetrooms() {
    this.Capacity = null;
    this.Price = null;
    this.TransportName = "";

    //this.SelectedTags2 = [];

    this.resetting = null;

  }
  ontodoDelete(item) {
    const index = this.hotel.TransportType.indexOf(item);
    if (index >= 0) {
      this.hotel.TransportType.splice(index, 1);
    }
  }

}



