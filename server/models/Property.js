// id: number;

//   title: String;
//   PropertyCatagory: string;
//   BuyRent: string;
//   description: String;
//   SocietyName: string;
//   propertyName:string;

//   society: Society;
//   propertyType: PropertyType;

//   imgsrcs: any = {};

//   tags: Array<string> = [];

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Scheme
const PropertyScheme = new Schema({
  title: {
    type: String
  },
  PropertyCatagory: {
    type: String
  },
  BuyRent: {
    type: String
  },
  description: {
    type: String
  },
  SocietyName: {
    type: String
  },
  propertyName: {
    type: String
  },
  society: {
    type: Schema.Types.Mixed,
    //ref: "societies"
  },
  propertyType: {
    type: Schema.Types.Mixed
    //ref:"PropertyTypes"
  },
  imgsrcs: {
    type: Schema.Types.Mixed,
  },
  consultantname: {
    type: String
  },
  ownername: {
    type: String
  },
  address: {
    type: String
  },

  tags: [{
    type: String
  }]
})
module.exports = Property = mongoose.model('Properties', PropertyScheme);