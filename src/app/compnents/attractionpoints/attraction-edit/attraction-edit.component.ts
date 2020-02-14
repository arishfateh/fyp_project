import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AttractionPointService } from 'src/app/services/attraction-point.service';
import { AttractionPoint } from 'src/app/model/attraction-point.model';
import { ForallService } from 'src/app/services/forall.service';
import { timer } from 'rxjs';
import { delay } from 'rxjs-compat/operator/delay';


@Component({
  selector: 'app-attraction-edit',
  templateUrl: './attraction-edit.component.html',
  styleUrls: ['./attraction-edit.component.css']
})
export class AttractionEditComponent implements OnInit {


  exampleForm: FormGroup;
  item: any;

  validation_messages = {
    'AttractionName': [
      { type: 'required', message: 'Attraction Name is required.' }
    ],
    'City': [
      { type: 'required', message: 'City is required.' }
    ],
    'Type': [
      { type: 'required', message: 'Type is required.' },
    ],
    'Priority': [
      { type: 'required', message: 'Priority is required.' },
    ],
    'Time': [
      { type: 'required', message: 'Time is required.' },
    ],
    'travelDistance': [
      { type: 'required', message: 'travelDistance is required.' },
    ],
    'travelTime': [
      { type: 'required', message: 'travelTime is required.' },
    ],
    'Price': [
      { type: 'required', message: 'Price is required.' },
    ]
    ,
    'Description': [
      { type: 'required', message: 'Description is required.' },
    ],
    'timeSlots': [
      { type: 'required', message: 'timeSlots is required.' },
    ],

  };
  attractionList: AttractionPoint[];
  public attraction: AttractionPoint = null;
  public check: number = 0;
  public len: number;

  constructor(
    public attractionPointService: AttractionPointService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public Service: AttractionPointService,
    public foral: ForallService
  ) { }
  public type: Array<string> = ['adventurous', 'aesthetic', 'All'];
  public disp: string = null;
  ngOnInit() {
    this.getData();
  }
  ngAfterViewChecked() {
    if (this.attraction && this.check == 0) {

      this.check = 1;
      console.log("a");
      this.createForm();
      this.disp = "ds";
    }
  }
  getData(): AttractionPoint {

    this.route.params.subscribe(param => {
      this.attractionPointService.getAttractionPoint(param['id'], this.attraction).then((res) => {
        this.attraction = res
        console.log(this.attraction, "iddddd");
      }
        //console.log(this.propertyService.getProperty(param['id']), " ;lj");
      )
    }

    )
    return this.attraction;
  }


  createForm() {
    console.log("in create form", this.attraction)
    this.exampleForm = this.fb.group({
      AttractionName: [this.attraction.AttractionName, Validators.required],
      City: [this.attraction.City, Validators.required],
      Price: [this.attraction.Price, Validators.required],
      Time: [this.attraction.Time, Validators.required],
      Priority: [this.attraction.Priority, Validators.required],
      Type: [this.attraction.Type, Validators.required],
      travelDistance: [this.attraction.travelDistance, Validators.required],
      travelTime: [this.attraction.travelTime, Validators.required],
      Description: [this.attraction.Description, Validators.required],
      timeSlots: [this.attraction.timeSlots, Validators.required],


    });
  }



  onSubmit(value) {

    console.log("sdf");
    this.route.params.subscribe(params => {
      this.attractionPointService.updateAttractionPoint(params['id'], value);

    });
    console.log("fssdf");
    setTimeout(() => {
      this.router.navigate(['home/attraction/view']);
    }, 2);

  }



  cancel() {
    this.router.navigate(['/home']);
  }

}
