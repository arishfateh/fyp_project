import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { ForallService } from 'src/app/services/forall.service';
import { RouteService } from 'src/app/services/route.service';
import { Route } from 'src/app/model/route.model';
import { City } from 'src/app/model/city.model';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit {

  exampleForm: FormGroup;

  validation_messages = {
    'StartPoint': [
      { type: 'required', message: 'StartPoint is required.' }
    ],
    'EndPoint': [
      { type: 'required', message: 'EndPoint is required.' }
    ],
    'Distance': [
      { type: 'required', message: 'Distance is required.' },
    ],
    'Priority': [
      { type: 'required', message: 'Priority is required.' },
    ],
    'Time': [
      { type: 'required', message: 'Time is required.' },
    ],
    'isAvailable': [
      { type: 'required', message: 'isAvailable is required.' },
    ],
    'roadCondition': [
      { type: 'required', message: 'roadCondition is required.' },
    ],


  };

  public isavailable: Array<string> = ['true', 'false'];

  public cityList: Array<City>;

  public routes: Route = null;
  public check: number = 0;
  public len: number;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private cityService: CityService,
    private snackBar: MatSnackBar,
    public foral: ForallService,
    private route: ActivatedRoute,
    public routeService: RouteService,
  ) { }
  public disp: string = null;
  ngOnInit() {
    this.getcityData();
    this.getData();
  }
  ngAfterViewChecked() {
    if (this.routes && this.check == 0) {

      this.check = 1;
      console.log("a");
      this.createForm();
      this.disp = "ds";
    }
  }
  getcityData() {


    this.cityService.getAllCity().subscribe(data => {
      this.cityList = data;
    })


  }
  getData(): Route {

    this.route.params.subscribe(param => {
      this.routeService.getRoute(param['id'], this.routes).then((res) => {
        this.routes = res
        console.log(this.routes, "iddddd");
      }
        //console.log(this.propertyService.getProperty(param['id']), " ;lj");
      )
    }

    )
    return this.routes;
  }

  createForm() {
    console.log("in create form", this.routes)
    this.exampleForm = this.fb.group({
      StartPoint: [this.routes.StartPoint, Validators.required],
      EndPoint: [this.routes.EndPoint, Validators.required],
      Distance: [this.routes.Distance, Validators.required],
      Time: [this.routes.Time, Validators.required],
      Priority: [this.routes.Priority, Validators.required],
      isAvailable: [this.routes.isAvailable, Validators.required],
      roadCondition: [this.routes.roadCondition, Validators.required],




    });
  }



  onSubmit(value) {

    console.log("sdf");
    this.route.params.subscribe(params => {
      this.routeService.updateRoute(params['id'], value);

    });
    console.log("fssdf");
    setTimeout(() => {
      this.router.navigate(['home/route/view']);
    }, 2);

  }



  cancel() {
    this.router.navigate(['/home']);
  }



}


