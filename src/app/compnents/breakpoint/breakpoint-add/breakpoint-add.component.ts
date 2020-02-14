import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route.service';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/model/city.model';

@Component({
  selector: 'app-breakpoint-add',
  templateUrl: './breakpoint-add.component.html',
  styleUrls: ['./breakpoint-add.component.css']
})
export class BreakpointAddComponent implements OnInit {
  exampleForm: FormGroup;

  validation_messages = {
    'StartPoint': [
      { type: 'required', message: 'StartPoint is required.' }
    ],
    'EndPoint': [
      { type: 'required', message: 'EndPoint is required.' }
    ],
    'StopType': [
      { type: 'required', message: 'StopType is required.' },
    ],
    'Priority': [
      { type: 'required', message: 'Priority is required.' },
    ],
    'Time': [
      { type: 'required', message: 'Time is required.' },
    ]
  };


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public breakPointService: BreakpointService,
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
      StartPoint: ['', Validators.required],
      EndPoint: ['', Validators.required],
      Time: ['', Validators.required],
      Priority: ['', Validators.required],
      StopType: ['', Validators.required],

    });
  }
  resetFields() {

    this.exampleForm = this.fb.group({
      StartPoint: new FormControl('', Validators.required),
      EndPoint: new FormControl('', Validators.required),
      Time: new FormControl('', Validators.required),
      Priority: new FormControl('', Validators.required),
      StopType: new FormControl('', Validators.required),

    });
  }
  onSubmit(value) {
    console.log(value);
    this.breakPointService.insert(value);
    this.resetFields();
    this.snackBar.open("BreakPoint added successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
