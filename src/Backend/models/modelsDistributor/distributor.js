const { string, number } = require("joi");
const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    product: [{
      id: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      totalprice: {
        type: Number,
        required: true,
      },
    }],
    total: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    dni: {
      type: String,
      require: true
    },
    phone: {
      type: Number,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    lastdate: {
      type: String,
      require: true
    },
    nextdate: {
      type: String,
      require: true
    },
    shopid: {
      type: String,
      require: true
    },


  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Distributor || mongoose.model("Distributor", StorageScheme);