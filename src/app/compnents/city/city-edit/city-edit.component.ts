import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { ForallService } from 'src/app/services/forall.service';
import { City } from 'src/app/model/city.model';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {

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



  public cities: City = null;
  public check: number = 0;
  public len: number;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public cityService: CityService,
    private snackBar: MatSnackBar,
    public foral: ForallService,
    private route: ActivatedRoute,
  ) { }
  public disp: string = null;
  ngOnInit() {
    this.getData();
  }
  ngAfterViewChecked() {
    if (this.cities && this.check == 0) {

      this.check = 1;
      console.log("a");
      this.createForm();
      this.disp = "ds";
    }
  }
  getData(): City {

    this.route.params.subscribe(param => {
      this.cityService.getCity(param['id'], this.cities).then((res) => {
        this.cities = res
        console.log(this.cities, "iddddd");
      }
        //console.log(this.propertyService.getProperty(param['id']), " ;lj");
      )
    }

    )
    return this.cities;
  }


  createForm() {
    console.log("in create form", this.cities)
    this.exampleForm = this.fb.group({
      CityName: [this.cities.CityName, Validators.required],
      StayPriority: [this.cities.StayPriority, Validators.required],
      Longitude: [this.cities.Longitude, Validators.required],
      Latitude: [this.cities.Latitude, Validators.required],
      MaximumStop: [this.cities.MaximumStop, Validators.required],



    });
  }



  onSubmit(value) {

    console.log("sdf");
    this.route.params.subscribe(params => {
      this.cityService.updateCity(params['id'], value);

    });
    console.log("fssdf");
    setTimeout(() => {
      this.router.navigate(['home/city/view']);
    }, 2);

  }



  cancel() {
    this.router.navigate(['/home']);
  }



}
