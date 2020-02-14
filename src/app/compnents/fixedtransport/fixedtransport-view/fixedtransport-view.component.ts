import { Component, OnInit } from '@angular/core';
import { AttractionPoint } from 'src/app/model/attraction-point.model'
import { AttractionPointService } from 'src/app/services/attraction-point.service';
import { MatSnackBar } from '@angular/material';
import { Breakpoints } from 'src/app/model/breakpoints.model';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { FixedTransport } from 'src/app/model/fixed-transport.model';
import { FixedTransportService } from 'src/app/services/fixed-transport.service';

@Component({
  selector: 'app-fixedtransport-view',
  templateUrl: './fixedtransport-view.component.html',
  styleUrls: ['./fixedtransport-view.component.css']
})
export class FixedtransportViewComponent implements OnInit {

  breakpointlist: FixedTransport[];
  public attraction: AttractionPoint;
  public check: number = 0;
  public len: number;
  constructor(public Service: FixedTransportService, private snackBar: MatSnackBar) { }

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
        this.breakpointlist.push(y as FixedTransport);
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
