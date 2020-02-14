import { AttractionPoint } from './attraction-point.model';
import { StayPoint } from './stay-point.model';
import { Route } from './route.model';

export class ItineraryDays {
    StartCity: string;
    EndCity: string;
    DayNo: number;
    Activity: Array<AttractionPoint> = [];
    RouteToFollow: Array<Route> = [];
    StayCity: string;


}
