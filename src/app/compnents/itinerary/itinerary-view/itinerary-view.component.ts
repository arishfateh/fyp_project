import { Component, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/model/itinerary.model';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { from } from 'rxjs';
import { ItineraryDays } from 'src/app/model/itinerary-days.model';
import { AttractionPoint } from 'src/app/model/attraction-point.model';
import { MatSnackBar } from '@angular/material';

class both {
  iti: Itinerary;
  days: ItineraryDays[];
}

@Component({
  selector: 'app-itinerary-view',
  templateUrl: './itinerary-view.component.html',
  styleUrls: ['./itinerary-view.component.css']
})


export class ItineraryViewComponent implements OnInit {

  itinerary: Itinerary[];
  itinerarydays: ItineraryDays[] = [];
  itinerarydays2: AttractionPoint[] = [];


  all: both[] = [];

  public check: number = 0;
  public len: number;
  constructor(public ItineraryService: ItineraryService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //console.log("dds");
    this.getData();
  }
  public newarray: ItineraryDays[] = [];
  thisfunc(item) {
    this.newarray.push(item);
    console.log("a")
  }
  ngAfterViewChecked() {
    if (this.itinerary && this.check == 0) {
      this.len = this.itinerary.length;
      this.check = 1;
      //console.log(this.itinerary);
      //console.log(this.itinerary[0].todo)



      for (var i = 0; i < this.itinerary.length; i++) {

        this.itinerarydays = [];

        var keys = Object.keys(this.itinerary[i].todo);
        var len = keys.length;
        //console.log(len, "dfsdsasd", keys)
        // console.log(this.itinerary[i].todo.length, "dsf");

        for (var q = 0; q < len; q++) {
          let array1 = this.itinerary[i].todo[keys[q]];
          // console.log(array1);
          this.itinerarydays.push(array1);
          this.itinerarydays.sort(function (a, b) {
            return a.DayNo - b.DayNo
          })
        }

        console.log(this.itinerarydays, "i", i);

        for (var j = 0; j < this.itinerarydays.length; j++) {
          console.log(this.itinerarydays.length)
          this.itinerarydays2 = [];
          var keys = Object.keys(this.itinerarydays[j].Activity);
          var len = keys.length;
          console.log(this.itinerarydays[j])
          //console.log(len, "dfsdsasd", keys)
          // console.log(this.itinerary[i].todo.length, "dsf");

          for (var q = 0; q < len; q++) {
            let array1 = this.itinerarydays[j].Activity[keys[q]];
            console.log(array1);
            this.itinerarydays2.push(array1);

          }
          console.log("iiii", this.itinerarydays[j].Activity)
          //this.itinerarydays[i].Activity = new Array<AttractionPoint>();
          this.itinerarydays[j].Activity = (this.itinerarydays2);
          console.log(this.itinerarydays[i]);
        }
        console.log("dsad")
        this.all.push({ iti: this.itinerary[i], days: this.itinerarydays })
        // this.itinerary[i].todo.map(this.thisfunc);
      }


      //this.all=this.all[1];
      console.log(this.all);


      // if (this.itinerary[0].todo) {
      //   for (var i = 0; i < this.itinerary.length; i++) {

      //     var keys = Object.keys(this.itinerary[i].todo);
      //     var len = keys.length;
      //     console.log(len, "dfsdsasd", keys)
      //     console.log(this.itinerary[i].todo.length, "dsf");

      //     for (var q = 0; q < len; q++) {
      //       let array1 = this.itinerary[i].todo[keys[q]];
      //       console.log(array1);
      //       this.itinerarydays.push(array1);
      //     }
      //     console.log(this.itinerarydays);

      //   }

      // }


      //      this.itinerarydays[0][0][0].


      // for (var i = 0; i < this.itinerary.length; i++) {
      //   this.transporttype.push(this.itinerary[i].TransportType);
      // }
    }
  }
  getData() {
    /*
      var x = this.ItineraryService.getdata();
      x.snapshotChanges().subscribe(item => {
        this.itinerary = [];
        item.forEach(e => {
          var y = e.payload.toJSON();
          y["ID"] = e.key;
          this.itinerary.push(y as Itinerary);
  
        })
  
      })
      console.log(this.itinerary);
  */
  }
  onDelete(id: string) {
    /*
    this.ItineraryService.delete(id);
    this.snackBar.open("Itinerary Deleted successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    window.location.reload();
  }
  */
  }
}
