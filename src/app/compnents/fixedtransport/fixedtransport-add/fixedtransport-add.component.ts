import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FixedTransportService } from 'src/app/services/fixed-transport.service';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/model/city.model';

@Component({
  selector: 'app-fixedtransport-add',
  templateUrl: './fixedtransport-add.component.html',
  styleUrls: ['./fixedtransport-add.component.css']
})
export class FixedtransportAddComponent implements OnInit {
  exampleForm: FormGroup;

  validation_messages = {

    'City': [
      { type: 'required', message: 'City is required.' }
    ],
    'NoOfVehicles': [
      { type: 'required', message: 'No Of Vehicles is required.' },
    ],
    'VendorName': [
      { type: 'required', message: 'Vendor Name is required.' },
    ],
    'VendorPhoneNo': [
      { type: 'required', message: 'Vendor Phone No is required.' },
    ],
    'StartPoint': [
      { type: 'required', message: 'StartPoint is required.' },
    ],
    'EndPoint': [
      { type: 'required', message: 'EndPoint is required.' },
    ],
    'Price': [
      { type: 'required', message: 'Price is required.' },
    ]

  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public fixedService: FixedTransportService,
    public cityService: CityService,
    private snackBar: MatSnackBar
  ) { }

  routeList: City[];

  ngOnInit() {
    this.getcityData();
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
      Price: ['', Validators.required],
      StartPoint: ['', Validators.required],
      EndPoint: ['', Validators.required],
      NoOfVehicles: ['', Validators.required],
      VendorName: ['', Validators.required],
      VendorPhoneNo: ['', Validators.required]


    });
  }
  resetFields() {

    this.exampleForm = this.fb.group({
      City: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      StartPoint: new FormControl('', Validators.required),
      EndPoint: new FormControl('', Validators.required),
      NoOfVehicles: new FormControl('', Validators.required),
      VendorName: new FormControl('', Validators.required),
      VendorPhoneNo: new FormControl('', Validators.required),

    });
  }
  onSubmit(value) {
    this.fixedService.insert(value);
    this.resetFields();
    this.snackBar.open("Fixed Transport added successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
