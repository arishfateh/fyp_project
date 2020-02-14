import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { StayPointService } from 'src/app/services/stay-point.service';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/model/city.model';

@Component({
  selector: 'app-stay-add',
  templateUrl: './stay-add.component.html',
  styleUrls: ['./stay-add.component.css']
})
export class StayAddComponent implements OnInit {


  exampleForm: FormGroup;

  validation_messages = {
    'DepartureCity': [
      { type: 'required', message: 'Departure City is required.' }
    ],
    'DestinationCity': [
      { type: 'required', message: 'Destination City is required.' }
    ],
    'StopOverCity': [
      { type: 'required', message: 'StopOver City is required.' },
    ],
    'Priority': [
      { type: 'required', message: 'Priority is required.' },
    ]


  };

  public isavailable: Array<string> = ['true', 'false'];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public stayService: StayPointService,
    public cityService: CityService,
    private snackBar: MatSnackBar
  ) { }

  public routeList: City[];
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
      DepartureCity: ['', Validators.required],
      DestinationCity: ['', Validators.required],
      StopOverCity: ['', Validators.required],
      Priority: ['', Validators.required],

    });
  }



  resetFields() {

    this.exampleForm = this.fb.group({
      DepartureCity: new FormControl('', Validators.required),
      DestinationCity: new FormControl('', Validators.required),
      StopOverCity: new FormControl('', Validators.required),
      Priority: new FormControl('', Validators.required),

    });
  }


  onSubmit(value) {
    this.stayService.insert(value);
    this.resetFields();
    this.snackBar.open("Stay Point added successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


}

