import { Component, OnInit } from '@angular/core';
import { Rooms } from 'src/app/model/rooms.model';
import { HotelService } from 'src/app/services/hotel.service';
import { from } from 'rxjs';
import { ItineraryDays } from 'src/app/model/itinerary-days.model';
import { AttractionPoint } from 'src/app/model/attraction-point.model';
import { RoomType } from 'src/app/model/room-type.model';
import { MatSnackBar } from '@angular/material';

class both {
  iti: Rooms;
  days: RoomType[];
}


@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})

export class HotelViewComponent implements OnInit {


  hotel: Rooms[];
  itinerarydays: RoomType[] = [];
  itinerarydays2: AttractionPoint[] = [];


  all: both[] = [];

  public check: number = 0;
  public len: number;
  public hotelservice: Array<string> = [];
  constructor(public hotelService: HotelService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //console.log("dds");
    //this.getData();
  }
  public newarray: ItineraryDays[] = [];
  thisfunc(item) {
    this.newarray.push(item);
    console.log("a")
  }

  // local() {
  //   // for (var i = 0; i < this.hotel.length; i++) {
  //   this.hotelService.addcitylocal(this.hotel);
  //   console.log("added")
  //   //}
  // }

  local() {
    let Itinerary: Array<Rooms> = JSON.parse(localStorage.getItem('hotel'));
    console.log(Itinerary)
    for (var i = 0; i < Itinerary.length; i++) {
      this.hotelService.addHotel(Itinerary[i]);
      console.log("added")
    }

  }

  ngAfterViewChecked() {
    if (this.hotel && this.check == 0) {
      this.len = this.hotel.length;
      this.check = 1;
      console.log(this.hotel);
      //console.log(this.hotel[0].todo)


      for (var j = 0; j < this.hotel.length; j++) {
        if (this.hotel[j].HotelServices) {
          var kk = Object.keys(this.hotel[j].HotelServices)
          var len = kk.length;
          console.log(len, "sdf", kk);
          for (var q = 0; q < len; q++) {
            let array1 = this.hotel[j].HotelServices[kk[q]];
            console.log(array1);
            this.hotelservice.push(array1);
            // this.itinerarydays.sort(function (a, b) {
            //   return a.DayNo - b.DayNo
            // })
            array1 = null;
          }
          console.log(this.hotelservice);
          this.hotel[j].HotelServices = this.hotelservice;
          this.hotelservice = [];
        }
      }

      for (var i = 0; i < this.hotel.length; i++) {

        this.itinerarydays = [];

        var keys = Object.keys(this.hotel[i].roomTypes);
        var len = keys.length;

        for (var q = 0; q < len; q++) {
          let array1 = this.hotel[i].roomTypes[keys[q]];
          // console.log(array1);
          this.itinerarydays.push(array1);
        }
        console.log(this.itinerarydays, "i", i);

        for (var p = 0; p < this.itinerarydays.length; p++) {
          if (this.itinerarydays[p].RoomServices) {
            var kk = Object.keys(this.itinerarydays[p].RoomServices)
            var len = kk.length;
            this.hotelservice = [];
            console.log(len, "sdf", kk);
            for (var q = 0; q < len; q++) {
              let array1 = this.itinerarydays[p].RoomServices[kk[q]];
              console.log(array1);
              this.hotelservice.push(array1);
              array1 = null;
            }
            console.log(this.hotelservice);
            this.itinerarydays[p].RoomServices = this.hotelservice;
          }
        }
        console.log("dsad")
        this.all.push({ iti: this.hotel[i], days: this.itinerarydays })
        // this.hotel[i].todo.map(this.thisfunc);
      }


      console.log(this.all);

    }
  }
  /*
  getData() {
    var x = this.hotelService.getdata();
    x.snapshotChanges().subscribe(item => {
      this.hotel = [];
      item.forEach(e => {
        var y = e.payload.toJSON();
        y["ID"] = e.key;
        this.hotel.push(y as Rooms);


      })

    })
    console.log(this.hotel);

  }
  */
  /*
  onDelete(id: string) {
    console.log(id);
    this.hotelService.delete(id);
    this.snackBar.open("Hotel Deleted successfully", null, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    window.location.reload();
  }
  */
}

