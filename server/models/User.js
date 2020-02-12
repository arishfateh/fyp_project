/*
export class User {
    id:number;
    username:string;
    password:string;
    token:string;
}
*/
/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var crypto = require('crypto');


//Create Scheme
const UserSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permission: [{
    type: String,
    required: true
  }]

})

//module.exports = User = mongoose.model('Users', UserScheme);   

// var User = mongoose.model('Users', UserSchema);
// module.exports = { User };

module.exports = User = mongoose.model('users', UserSchema);*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  perm: [
    {
      type: Schema.Types.Mixed,
      required: true
      //ref: "fields"
    }
  ]

});

module.exports = User = mongoose.model('users', UserSchema);