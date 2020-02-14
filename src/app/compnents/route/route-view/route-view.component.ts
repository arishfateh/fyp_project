import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/model/route.model';
import { RouteService } from 'src/app/services/route.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ForallService } from 'src/app/services/forall.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.css']
})
export class RouteViewComponent implements OnInit {
  routeList: Route[];
  public check: number = 0;
  public len: number;



  public check1: number = 0;

  displayedColumns: string[] = ['StartPoint', 'EndPoint', 'Distance(m)', 'Time(min)', 'Priority', 'isAvailable', 'actions'];

  public tok: any = null;
  public checkerror: number = 0;
  constructor(public Service: RouteService, private snackBar: MatSnackBar, public foral: ForallService) { }

  ngOnInit() {
    this.getData();
  }

  // local() {
  //   // for (var i = 0; i < this.routeList.length; i++) {
  //   this.Service.addcitylocal(this.routeList);
  //   console.log("added")
  //   //}
  // }



  // local() {
  //   let Itinerary: Array<Route> = JSON.parse(localStorage.getItem('route'));

  //   for (var i = 0; i < Itinerary.length; i++) {
  //     this.Service.addRoute(Itinerary[i]);
  //     console.log("added")
  //   }

  // }

  ngAfterViewChecked() {
    if (this.routeList && this.check == 0) {
      this.len = this.routeList.length;
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

        this.snackBar.open("Consultant Deleted", null, {
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

  getData() {
    this.foral.getAllRoutes().subscribe(data => {
      this.routeList = data;
    })

  }

  onDelete(id: string) {
    this.foral.deleteRoute(id).subscribe((data: any) =>
      this.tok = data
    )
  }
  changed(imi, start, end) {
    console.log("sdf", start, end);

    console.log(this.routeList.find(a => a.StartPoint === start && a.EndPoint == end));
    this.Service.updateRoute(imi, this.routeList.find(a => a.StartPoint === start && a.EndPoint == end));

  }


}
