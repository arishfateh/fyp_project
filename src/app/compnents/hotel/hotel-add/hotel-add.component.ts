import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { DomSanitizer } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Rooms } from 'src/app/model/rooms.model';
import { RoomType } from 'src/app/model/room-type.model';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/model/city.model';

@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrls: ['./hotel-add.component.css']
})
export class HotelAddComponent implements OnInit {


  exampleForm: FormGroup;

  public hotel: Rooms;
  public rooms1: RoomType[] = [];
  public rooms: RoomType;


  public roomType: string;
  public NoOfRooms: number;
  public Price: number;
  public Occupancy: number;
  public RoomServices: Array<string>;

  validation_messages = {
    'City': [
      { type: 'required', message: 'City is required.' }
    ],
    'HotelName': [
      { type: 'required', message: 'Hotel Name is required.' }
    ],
    'NoOfRooms': [
      { type: 'required', message: 'No Of Rooms is required.' },
    ],
    'VendorName': [
      { type: 'required', message: 'Vendor Name is required.' },
    ],
    'VendorPhoneNo': [
      { type: 'required', message: 'Vendor PhoneNo is required.' },
    ],


  };

  showarrayHotel: string[] = [
    'Free parking',
    'Free WiFi',
    'Food & Drink',

    'Airport shuttle',
    'Pool and wellness',
    'Swimming pool',
    'Sun umbrellas',
    'Sun loungers or beach chairs',
    'Pool/beach towels',
    'Parking',
    'Pets allowed',
    'Pets are not allowed.',

    'Food & Drink',
    'Special diet menus (on request)',
    'Snack bar',
    'Breakfast in the room',
    'Bar',
    'Restaurant',

    'Accessibility',
    'Lower bathroom sink',
    'Higher level toilet',
    'Toilet with grab rails',
    'Wheelchair accessible',

    'Bathroom',
    'Free toiletries',

    'Outdoors',
    'Outdoor pool',
    'BBQ facilities',
    'Garden',

    'General',
    'WiFi available in all areas',
    'Adult only',
    'Mini-market on site',
    'Airport shuttle (additional charge)',
    'Airport shuttle (free)',
    'Vending machine (drinks)',
    'Designated smoking area',
    'Air conditioning',
    'Allergy-free room',
    'Shops (on site)',
    'Car hire',
    'Packed lunches',
    'Gift shop',
    'Safety deposit box',
    'Lift',
    'VIP room facilities',
    'Barber/beauty shop',
    'Facilities for disabled guests',
    'Airport shuttle',
    'Jeeps',
    'Rent-a-car',
    'Non-smoking rooms',
    'Newspapers',
    'Room service',
    'Transport',
    'Airport drop off',
    'Airport pick up',
    'Reception services',
    'Lockers',
    'Concierge service',
    'ATM/cash machine on site',
    'Luggage storage',
    'Tour desk',
    'Currency exchange',
    'Valet parking',
    '24-hour front desk',

    'Cleaning services',
    'Daily housekeeping',
    'Trouser press',
    'Shoeshine',
    'Ironing service',
    'Dry cleaning',
    'Laundry',

    'Business facilities',
    'Fax/photocopying',
    'Business centre',
    'Meeting/banquet facilities',
  ];


  showarrayRooms: Array<string> = [
    'Tea/Coffee Maker',
    'Minibar',
    'Safety Deposit Box',
    'Telephone',
    'Air conditioning',
    'Pants Press',
    'Refrigerator',
    'Desk',
    'Ironing Facilities',
    'Seating Area',
    'Satellite Channels',
    'Cable Channels',
    'Flat-screen TV',
    'Sofa',
    'Tile/Marble floor',
    'Hardwood or parquet floors',
    'Wake-up service',
    'Electric kettle',
    'Executive Lounge Access Wardrobe or closet',
    'Cleaning products',
    'Bedding',
    'Bottle of water',
    'Free WiFi',

    'Space between access and wardrobe',
    'Hairdryer',
    'Bathrobe',
    'Free toiletries',
    'Slippers',
    'Bath',
    'Shower',
    'Towels',
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  alltags: Observable<string[]>;
  SelectedTags: string[] = [];

  fruitCtrl2 = new FormControl();
  alltags2: Observable<string[]>;
  SelectedTags2: string[] = [];


  public isavailable: Array<string> = ['true', 'false'];

  public tag: Array<string>;
  public tag2: Array<string>;
  public add1: string;


  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  @ViewChild('fruitInput2', { static: false }) fruitInput2: ElementRef<HTMLInputElement>;
  @ViewChild('auto2', { static: false }) matAutocomplete2: MatAutocomplete;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public hotelService: HotelService,
    public cityService: CityService,
    private sanitizer: DomSanitizer, private snackBar: MatSnackBar

  ) {
    this.alltags = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.tag.slice()));

    this.alltags2 = this.fruitCtrl2.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter2(fruit) : this.tag2.slice()));


  }

  public routeList: City[];
  ngOnInit() {
    this.getcityData();

    this.hotel = new Rooms;

    this.tag = this.showarrayHotel;
    this.tag2 = this.showarrayRooms;
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
      HotelName: ['', Validators.required],
      NoOfRooms: ['', Validators.required],
      VendorName: ['', Validators.required],
      VendorPhoneNo: ['', Validators.required],

    });


  }



  resetFields() {

    this.exampleForm = this.fb.group({
      City: new FormControl('', Validators.required),
      HotelName: new FormControl('', Validators.required),
      NoOfRooms: new FormControl('', Validators.required),
      VendorName: new FormControl('', Validators.required),
      VendorPhoneNo: new FormControl('', Validators.required),

    });
  }


  onSubmit(value: Rooms) {

    console.log("in save");
    let ret = false;
    if (this.SelectedTags.length > 0) {
      //this.user.permissions = this.SelectedTags;
    }
    else {
      this.snackBar.open('enter Hotel Services', null, {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      ret = true;
    }

    if (this.rooms1.length <= 0) {
      this.snackBar.open('Enter Room types', null, {
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
      this.hotel.HotelName = value.HotelName;
      this.hotel.NoOfRooms = value.NoOfRooms;
      this.hotel.VendorName = value.VendorName;
      this.hotel.VendorPhoneNo = value.VendorPhoneNo;
      this.hotel.HotelServices = this.SelectedTags;

      this.hotel.roomTypes = this.rooms1;

      console.log(this.hotel);
      //  this.hotelService.insert(this.hotel);
      this.resetFields();
      this.snackBar.open("Hotel added successfully", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }


  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      console.log(event);

      // Add our fruit
      if ((value || '').trim()) {
        this.SelectedTags.push(value.trim());

        //console.log(value.trim());
      }

      this.fruitCtrl.setValue(null);


      // Reset the input value
      if (input) {
        input.value = '';
      }


    }



  }


  remove(fruit: string): void {
    const index = this.SelectedTags.indexOf(fruit);

    if (index >= 0) {
      this.SelectedTags.splice(index, 1);
    }
    this.tag.push(fruit);
    console.log(this.tag);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("chala selected", event.option.viewValue);
    const index = this.tag.indexOf(event.option.viewValue);

    if (index >= 0) {
      this.tag.splice(index, 1);
    }
    console.log(this.tag);

    this.SelectedTags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tag.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  /////////////////for rooms/////////////////
  add2(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete2.isOpen) {
      const input = event.input;
      const value = event.value;

      console.log(event);

      // Add our fruit
      if ((value || '').trim()) {
        this.SelectedTags2.push(value.trim());

        //console.log(value.trim());
      }

      this.fruitCtrl2.setValue(null);


      // Reset the input value
      if (input) {
        input.value = '';
      }


    }



  }


  remove2(fruit: string): void {
    const index = this.SelectedTags2.indexOf(fruit);

    if (index >= 0) {
      this.SelectedTags2.splice(index, 1);
    }
    this.tag2.push(fruit);
    console.log(this.tag2);
  }

  selected2(event: MatAutocompleteSelectedEvent): void {
    console.log("chala selected", event.option.viewValue);
    const index = this.tag2.indexOf(event.option.viewValue);

    if (index >= 0) {
      this.tag2.splice(index, 1);
    }
    console.log(this.tag2);

    this.SelectedTags2.push(event.option.viewValue);
    this.fruitInput2.nativeElement.value = '';
    this.fruitCtrl2.setValue(null);
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tag2.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  Addcheck() {
    if (this.roomType !== "" && this.Price != null && this.NoOfRooms != null && this.Occupancy != null) {
      this.add1 = "dsda";
      console.log("efasda");
    }
  }

  public resetting: string;
  public cansave: string;
  addroomtype() {
    this.rooms = new RoomType;
    this.rooms.NoOfRooms = this.NoOfRooms;
    this.rooms.Occupancy = this.Occupancy;
    this.rooms.Price = this.Price;
    this.rooms.roomType = this.roomType;
    const aa = this.SelectedTags2;
    for (var i = 0; i < this.SelectedTags2.length; i++) {
      this.rooms.RoomServices.push(this.SelectedTags2[i]);

    }
    //this.rooms.RoomServices = this.SelectedTags2;
    if (this.rooms.RoomServices.length === this.SelectedTags2.length) {
      this.rooms1.push(this.rooms);
      this.rooms = new RoomType;
      //this.hotel.roomTypes.push(this.rooms);
      //if (this.rooms1.RoomServices.length === this.SelectedTags2.length) {
      {
        console.log("in room type", this.rooms1);
        //console.log("hotel", this.hotel);
        // this.resetrooms();
        this.resetting = "true";
        this.cansave = "true";
        this.add1 = null;

      }
    }
  }

  resetrooms() {
    this.roomType = "";
    this.Price = null;
    this.Occupancy = null;
    this.NoOfRooms = null;
    //this.SelectedTags2 = [];
    this.tag2 = this.showarrayRooms;
    this.alltags2 = this.fruitCtrl2.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter2(fruit) : this.tag2.slice()));



    if (this.SelectedTags2.length > 0) {
      var aa = this.SelectedTags2;

      for (var i = 0; i < aa.length; i++) {
        this.remove2(aa[i]);
      }
    }
    this.resetting = null;

  }

  onhotelDelete(item) {
    const index = this.rooms1.indexOf(item);
    if (index >= 0) {
      this.rooms1.splice(index, 1);
    }
  }
}


