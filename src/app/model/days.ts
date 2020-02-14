import { AttractionPoint } from './attraction-point.model';
import { Route } from './route.model';

export class Days {
    AttractionPoints: Array<AttractionPoint> = []
    isTravel: Boolean;
    CurrentRoute: Array<Route> = [];
    Dayno: number;
    cityname: string;
    fromcity: string;
}

