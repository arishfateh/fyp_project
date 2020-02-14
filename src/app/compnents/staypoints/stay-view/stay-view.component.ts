import { Component, OnInit } from '@angular/core';
import { StayPoint } from 'src/app/model/stay-point.model';
import { StayPointService } from 'src/app/services/stay-point.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stay-view',
  templateUrl: './stay-view.component.html',
  styleUrls: ['./stay-view.component.css']
})
export class StayViewComponent implements OnInit {
  stayList: StayPoint[];
  public check: number = 0;
  public len: number;
  constructor(public Service: StayPointService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //console.log("dds");
    this.getData();
  }
  ngAfterViewChecked() {
    if (this.stayList && this.check == 0) {
      this.len = this.stayList.length;
      this.check = 1;
    }
  }
  getData() {
    var x = this.Service.getdata();
    x.snapshotChanges().subscribe(item => {
      this.stayList = [];
      item.forEach(e => {
        var y = e.payload.toJSON();
        y["ID"] = e.key;
        this.stayList.push(y as StayPoint);
      })

    })
    console.log(this.stayList);
  }
  onDelete(id: string) {
    this.Service.delete(id);
    this.snackBar.open("Stay Point deleted successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
