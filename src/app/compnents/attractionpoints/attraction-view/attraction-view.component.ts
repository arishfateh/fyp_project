import { Component, OnInit } from '@angular/core';
import { AttractionPoint } from 'src/app/model/attraction-point.model'
import { AttractionPointService } from 'src/app/services/attraction-point.service';
import { MatSnackBar } from '@angular/material';
import { ForallService } from 'src/app/services/forall.service';
@Component({
  selector: 'app-attraction-view',
  templateUrl: './attraction-view.component.html',
  styleUrls: ['./attraction-view.component.css']
})
export class AttractionViewComponent implements OnInit {
  attractionList: AttractionPoint[];
  public attraction: AttractionPoint;
  public check: number = 0;
  public check1: number = 0;

  public len: number;
  public tok: any = null;
  public checkerror: number = 0;
  displayedColumns: string[] = ['AttractionName', 'City', 'Type', 'Price', 'Priority', 'timeSlots', 'Time', 'actions'];


  constructor(public Service: AttractionPointService, private snackBar: MatSnackBar, public foral: ForallService) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    if (this.attractionList && this.check == 0) {
      this.len = this.attractionList.length;
      this.check = 1;

    }
    if (this.tok) {


      if (this.tok != "Deleted Successfully" && this.checkerror == 0) {
        //console.log("laa");
        //this.errorss = [];
        this.snackBar.open("Could not delete", null, {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

      }

      else if (this.tok && this.check1 === 0 && this.tok === "Deleted Successfully") {

        this.snackBar.open("Attraction Point Deleted", null, {
          duration: 3000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });


        //console.log(this.tok, "wewfw");
        this.check1 = 1;
        window.location.reload();

        // this.NgZone.run(() => this.router.navigateByUrl(this.returnUrl))

        // this.ngZone.run(() => {
        //   this.router.navigateByUrl(this.returnUrl);
        // });
      }



    }

  }


  // local() {
  //   //for (var i = 0; i < this.attractionList.length; i++) {
  //   this.Service.addcitylocal(this.attractionList);
  //   console.log("added")
  //   // }
  // }


  // local() {
  //   let Itinerary: Array<AttractionPoint> = JSON.parse(localStorage.getItem('attractionpoints'));
  //   console.log(Itinerary)
  //   for (var i = 0; i < Itinerary.length; i++) {
  //     this.Service.addAtr(Itinerary[i]);
  //     console.log("added")
  //   }

  // }

  getData() {

    //for firebase viewing

    /*var x = this.Service.getdata();
    x.snapshotChanges().subscribe(item => {
      this.attractionList = [];
      item.forEach(e => {
        var y = e.payload.toJSON();
        y["ID"] = e.key;
        this.attractionList.push(y as AttractionPoint);
      })
    })
    console.log(this.attractionList);
    */

    this.Service.getAllAttractionPoints().subscribe(data => {
      this.attractionList = data;
    })
    this.attractionList.forEach(value => {
      console.log(value, 'daasd')
    })


  }


  onDelete(id) {
    this.Service.deleteAttractionPoint(id).subscribe((data: any) =>
      this.tok = data
    )

  }
}
