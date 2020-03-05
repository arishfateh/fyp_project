import { ItineraryDays } from './itinerary-days.model';
import { Days } from './days';

export class Itinerary {
    _id: string;
    NoOfDays: number;
    Destination: string;
    PriceBracket: string;
    GroupType: string;
    NoOfPeople: number;
    TotalCost: number;
    todo: Array<Days> = [];
    scores: Array<number> = [];
}
