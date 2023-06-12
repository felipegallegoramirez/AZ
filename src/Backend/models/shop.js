const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        unique: true,
      },
    nit: {
        type:String,
        unique: true,
    },
    name: {
        type:String,
    },
    address: {
        type: String, 
    },
    ownerid: {
      type: String, 
    },
    phone: {
      type: String, 
    },
    employeeid: [{
      type: String, 
    }],

    },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Shop || mongoose.model("Shop", StorageScheme);