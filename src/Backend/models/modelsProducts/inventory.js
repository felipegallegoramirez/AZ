const { string, number } = require("joi");
const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
    productname: {
        type:String,
        require:true
    },
    count: {
        type:Number,
        require:true
    },
    category: {
        type: String, 
        require:true
    },
    price: {
        type:Number,
        require:true
    },
    points: {
      type:Number,
      require:true
    },
    shopid: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    },

    },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Inventory || mongoose.model("Inventory", StorageScheme);