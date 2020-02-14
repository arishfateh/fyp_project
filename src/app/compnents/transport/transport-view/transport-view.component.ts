import { Component, OnInit } from '@angular/core';
import { Transport } from 'src/app/model/transport.model';
import { TransportService } from 'src/app/services/transport.service';
import { from } from 'rxjs';
import { TransportType } from 'src/app/model/transport-type.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-transport-view',
  templateUrl: './transport-view.component.html',
  styleUrls: ['./transport-view.component.css']
})
export class TransportViewComponent implements OnInit {

  stayList: Transport[];
  transporttype: TransportType[];

  public check: number = 0;
  public len: number;
  public itinerarydays: TransportType[] = [];
  public jaj: any;
  constructor(public Service: TransportService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //console.log("dds");
    this.getData();
  }
  ngAfterViewChecked() {
    if (this.stayList && this.check == 0) {
      this.len = this.stayList.length;
      this.check = 1;
      console.log(this.stayList);


      for (var i = 0; i < this.stayList.length; i++) {

        this.itinerarydays = [];

        var keys = Object.keys(this.stayList[i].TransportType);
        var len = keys.length;
        //console.log(len, "dfsdsasd", keys)
        // console.log(this.itinerary[i].todo.length, "dsf");

        for (var q = 0; q < len; q++) {
          let array1 = this.stayList[i].TransportType[keys[q]];
          // console.log(array1);
          this.itinerarydays.push(array1);

        }

        console.log(this.itinerarydays, "i", i);
        this.stayList[i].TransportType = this.itinerarydays;

        // for (var i = 0; i < this.stayList.length; i++) {
        //   this.transporttype.push(this.stayList[i].TransportType);
        // }
        this.jaj = "dds";
      }
    }
  }
  getData() {
    var x = this.Service.getdata();
    x.snapshotChanges().subscribe(item => {
      this.stayList = [];
      item.forEach(e => {
        var y = e.payload.toJSON();
        y["ID"] = e.key;
        this.stayList.push(y as Transport);
      })

    })
    console.log(this.stayList);
  }
  onDelete(id: string) {
    this.jaj = null;
    this.check = 0;
    this.Service.delete(id);
    this.snackBar.open("Transport Deleted successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    window.location.reload();
  }
}

