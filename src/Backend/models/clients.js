const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
    dni: {
        type:Number,
        unique: true,
    },
    name: {
        type:String,
    },
    address: {
        type: String, 
    },
    phone: {
        type:Number,
    },
    points: {
      type:Number,
    },
    sells: [{
      id: {
        type:String,
        require:true
      },
      price: {
        type:Number,
        require:true
      },
      points: {
        type:Number,
        require:true
      }
    }],
    shopid: {
      type:String,
      require:true
    }},

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Clients || mongoose.model("Clients", StorageScheme);