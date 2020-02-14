import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteAddComponent } from './compnents/route/route-add/route-add.component'
import { AttractionAddComponent } from './compnents/attractionpoints/attraction-add/attraction-add.component';
import { StayAddComponent } from './compnents/staypoints/stay-add/stay-add.component'
import { HotelAddComponent } from './compnents/hotel/hotel-add/hotel-add.component'
import { TransportAddComponent } from './compnents/transport/transport-add/transport-add.component';
import { TransportViewComponent } from './compnents/transport/transport-view/transport-view.component';
import { HotelViewComponent } from './compnents/hotel/hotel-view/hotel-view.component';
import { RouteViewComponent } from './compnents/route/route-view/route-view.component';
import { AttractionViewComponent } from './compnents/attractionpoints/attraction-view/attraction-view.component';
import { StayViewComponent } from './compnents/staypoints/stay-view/stay-view.component';
import { ItineraryAddComponent } from './compnents/itinerary/itinerary-add/itinerary-add.component';
import { ItineraryViewComponent } from './compnents/itinerary/itinerary-view/itinerary-view.component';
import { CityAddComponent } from './compnents/city/city-add/city-add.component';
import { CityViewComponent } from './compnents/city/city-view/city-view.component';
import { BreakpointAddComponent } from './compnents/breakpoint/breakpoint-add/breakpoint-add.component';
import { FixedtransportAddComponent } from './compnents/fixedtransport/fixedtransport-add/fixedtransport-add.component';
import { BreakpointViewComponent } from './compnents/breakpoint/breakpoint-view/breakpoint-view.component';
import { FixedtransportViewComponent } from './compnents/fixedtransport/fixedtransport-view/fixedtransport-view.component';
import { AttractionEditComponent } from './compnents/attractionpoints/attraction-edit/attraction-edit.component';
import { RouteEditComponent } from './compnents/route/route-edit/route-edit.component';
import { HomeComponent } from './compnents/home/home.component';
import { AboutUsComponent } from './compnents/about-us/about-us.component';
import { SearchComponent } from './compnents/search/search.component';
import { CityEditComponent } from './compnents/city/city-edit/city-edit.component';
import { Search2Component } from './compnents/search2/search2.component';



const routes: Routes = [{


  path: '',
  redirectTo: 'home/search',
  pathMatch: 'full'
},
{
  path: 'home',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'search',
      pathMatch: 'full'
    },
    {
      path: 'search',
      component: SearchComponent,
      //canActivate: [AuthGuard],
      children: []
    },


    {
      path: 'about',
      component: AboutUsComponent,
      //canActivate: [AuthGuard],
      children: []
    },

    {
      path: 'route',
      component: RouteAddComponent,
      //canActivate: [AuthGuard],
      children: []
    },
    {
      path: 'route/view',
      component: RouteViewComponent,
      //canActivate: [AuthGuard],
      children: []
    },
    {
      path: 'route/view/edit/:id',
      component: RouteEditComponent,
    },

    {
      path: 'attraction',
      component: AttractionAddComponent,
    },

    {
      path: 'breakpoint',
      component: BreakpointAddComponent,
    },
    {
      path: 'breakpoint/view',
      component: BreakpointViewComponent,
    },
    {
      path: 'attraction/view',
      component: AttractionViewComponent,
    },
    {
      path: 'attraction/view/edit/:id',
      component: AttractionEditComponent,
    },
    {
      path: 'stay',
      component: StayAddComponent,
    },
    {
      path: 'stay/view',
      component: StayViewComponent,
    },
    {
      path: 'hotel',
      component: HotelAddComponent,
    },
    {
      path: 'hotel/view',
      component: HotelViewComponent,
    },
    {
      path: 'transport',
      component: TransportAddComponent,
    },
    {
      path: 'transport/view',
      component: TransportViewComponent,
    },
    {
      path: 'itinerary',
      component: ItineraryAddComponent,
    },
    {
      path: 'itinerary/view',
      component: ItineraryViewComponent,
    },
    {
      path: 'city',
      component: CityAddComponent,
    },
    {
      path: 'city/view',
      component: CityViewComponent,
    },
    {
      path: 'city/view/edit/:id',
      component: CityEditComponent,
    },

    {
      path: 'fixedtransport',
      component: FixedtransportAddComponent,
    },
    {
      path: 'fixedtransport/view',
      component: FixedtransportViewComponent,
    },
    {
      path: 'displayItinerary',
      component: Search2Component,
    },
    {
      path: 'search/itinerary/view',
      component: ItineraryViewComponent,
    },
    {
      path: 'search2',
      component: Search2Component,
    },

  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
