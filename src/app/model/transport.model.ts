import { TransportType } from './transport-type.model';

export class Transport {
    ID: string;
    City: string;
    NoOfVehicles: string;
    VendorName: string;
    VendorPhoneNo: string;
    TransportType: Array<TransportType> = [];
    PriceType: string;
}
