import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { ForallService } from 'src/app/services/forall.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {


  exampleForm: FormGroup;

  validation_messages = {
    'CityName': [
      { type: 'required', message: 'City Name is required.' }
    ],
    'StayPriority': [
      { type: 'required', message: 'StayPriority  is required.' }
    ],
    'Latitude': [
      { type: 'required', message: 'Latitude is required.' }
    ],
    'Longitude': [
      { type: 'required', message: 'Longitude is required.' }
    ],
    'MaximumStop': [
      { type: 'required', message: 'MaximumStop is required.' }
    ],
  };

  public isavailable: Array<string> = ['true', 'false'];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public cityService: CityService,
    private snackBar: MatSnackBar,
    public foral: ForallService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      CityName: ['', Validators.required],
      StayPriority: ['', Validators.required],
      Longitude: ['', Validators.required],
      Latitude: ['', Validators.required],
      MaximumStop: ['', Validators.required],
    });
  }



  resetFields() {

    this.exampleForm = this.fb.group({
      CityName: new FormControl('', Validators.required),
      StayPriority: new FormControl('', Validators.required),
      Longitude: new FormControl('', Validators.required),
      Latitude: new FormControl('', Validators.required),
      MaximumStop: new FormControl('', Validators.required),


    });
  }


  onSubmit(value) {

    this.cityService.addCity(value);


    this.resetFields();
    this.snackBar.open("City added successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}

