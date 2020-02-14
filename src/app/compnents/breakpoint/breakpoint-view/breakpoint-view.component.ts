import { Component, OnInit } from '@angular/core';
import { AttractionPoint } from 'src/app/model/attraction-point.model'
import { AttractionPointService } from 'src/app/services/attraction-point.service';
import { MatSnackBar } from '@angular/material';
import { Breakpoints } from 'src/app/model/breakpoints.model';
import { BreakpointService } from 'src/app/services/breakpoint.service';
@Component({
  selector: 'app-breakpoint-view',
  templateUrl: './breakpoint-view.component.html',
  styleUrls: ['./breakpoint-view.component.css']
})
export class BreakpointViewComponent implements OnInit {

  breakpointlist: Breakpoints[];
  public attraction: AttractionPoint;
  public check: number = 0;
  public len: number;
  constructor(public Service: BreakpointService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }
  ngAfterViewChecked() {
    if (this.breakpointlist && this.check == 0) {
      this.len = this.breakpointlist.length;
      this.check = 1;
      console.log(this.breakpointlist);
    }
  }
  getData() {
    var x = this.Service.getdata();
    x.snapshotChanges().subscribe(item => {
      this.breakpointlist = [];
      item.forEach(e => {
        var y = e.payload.toJSON();
        y["ID"] = e.key;
        this.breakpointlist.push(y as Breakpoints);
      })
    })
    console.log(this.breakpointlist);

  }


  onDelete(id: string) {
    this.Service.delete(id);
    this.snackBar.open("Attraction Point deleted successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
