import { RoomType } from './room-type.model';

export class Rooms {
    ID: string;
    City: string;
    HotelName: string;
    NoOfRooms: string;
    VendorName: String;
    VendorPhoneNo: string;
    HotelServices: Array<string> = [];
    roomTypes: Array<RoomType> = [];
}
