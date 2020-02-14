import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  // Sidenav responsive
  width;
  height;
  mode = 'side';
  open = 'true';
  title = 'Pak Touring';
  title1 = 'Expanding Horizons'
  navList: NavList[];
  navList1: NavList[];
  navList2: NavList[];


  constructor(public ngZone: NgZone,
    public route: Router,
    public Pwa: PwaService, ) {

    this.navList = [
      {
        categoryName: 'Cities', icon: 'layers', dropDown: false,
        subCategory:
          [

            { subCategoryName: 'Add', subCategoryLink: 'city', visable: true, },
            { subCategoryName: 'View', subCategoryLink: 'city/view', visable: true, },

          ]
      },
      {
        categoryName: 'Attraction Point', icon: 'terrain', dropDown: false,
        subCategory:
          [

            { subCategoryName: 'Add', subCategoryLink: 'attraction', visable: true, },
            { subCategoryName: 'View', subCategoryLink: 'attraction/view', visable: true, },

          ]
      },

      {
        categoryName: 'Route', icon: 'navigation', dropDown: false,
        subCategory:
          [
            { subCategoryName: 'Add', subCategoryLink: 'route', visable: true, },
            { subCategoryName: 'View', subCategoryLink: 'route/view', visable: true, },

          ]
      },

      {
        categoryName: 'Stay Point', icon: 'location_city', dropDown: false,
        subCategory:
          [
            { subCategoryName: 'Add', subCategoryLink: 'stay', visable: true, },
            { subCategoryName: 'View', subCategoryLink: 'stay/view', visable: true, },

          ]
      },
      {
        categoryName: 'Transport', icon: 'departure_board', dropDown: false,
        subCategory:
          [
            { subCategoryName: 'Add', subCategoryLink: 'transport', visable: true, },
            { subCategoryName: 'View', subCategoryLink: 'transport/view', visable: true, },

          ]
      },
      {
        categoryName: 'Hotel', icon: 'local_hotel', dropDown: false,
        subCategory:
          [
            { subCategoryName: 'Add', subCategoryLink: 'hotel', visable: true, },
            { subCategoryName: 'View', subCategoryLink: 'hotel/view', visable: true, },

          ]
      },
      {
        categoryName: 'Itinerary', icon: 'map', dropDown: false,
        subCategory:
          [
            { subCategoryName: 'Add', subCategoryLink: 'itinerary', visable: true, },
            { subCategoryName: 'View', subCategoryLink: 'itinerary/view', visable: true, },

          ]
      },
      {
        categoryName: 'Website', icon: 'map', dropDown: false,
        subCategory:
          [
            { subCategoryName: 'Search view', subCategoryLink: 'search', visable: true, },
            { subCategoryName: 'About us View', subCategoryLink: 'about', visable: true, },

          ]
      },

    ];

    this.changeMode();
    window.onresize = (e) => {
      ngZone.run(() => {
        this.changeMode();
      });
    };
  }

  ngOnInit() {

    const fields = {};
    //const properties: Array<Property> = this.propertyService.getAll();
    /*  this.propertyService.getAll().subscribe(data => {
        this.properties = data;
      })
  */

  }
  changeMode() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.width <= 800) {
      this.mode = 'over';
      this.open = 'false';
    }
    if (this.width > 800) {
      this.mode = 'side';
      this.open = 'true';
    }
  }

  closeNav(param) {
    // this.navList[param].dropDown=false;
    this.navList.forEach((element, index) => {
      if (index !== param) {
        element.dropDown = false;
      }
    });
  }

  logout() {
    //    this.authService.logout();
    //   this.route.navigate(['login']);
  }

}

export class NavList {
  categoryName: string;
  icon: string;
  dropDown: boolean;
  subCategory: NavListItem[];

  constructor(_categoryName: string, _icon: string, _dropDown: boolean, _subCategory: NavListItem[]) {
    this.categoryName = _categoryName;
    this.icon = _icon;
    this.dropDown = _dropDown;
    this.subCategory = _subCategory;
  }
}

export class NavListItem {
  subCategoryName: string;
  subCategoryLink: string;
  subCategoryQuery?: any;
  visable: boolean;
}
