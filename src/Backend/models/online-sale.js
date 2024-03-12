const { text } = require("express");
const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    client: {
      id: {
        type: String,
        require: false
      },
      dni: {
        type: Number,
        require: false
      },
      name: {
        type: String,
        require: false
      },
      number: {
        type: String,
        require: false
      },
      address: {
        type: String,
        require: false
      },
      email: {
        type: String,
        require: false
      },
    },

    date: {
      type: String,
      require: true
    },

    product: [{
      id: {
        type: String,
        require: false
      },
      name: {
        type: String,
        require: false
      },
      count: {
        type: Number,
        require: false
      },
      unitarypoints: {
        type: String,
        require: false
      },
      totalpoints: {
        type: Number,
        require: false
      },
      unitaryprice: {
        type: String,
        require: false
      },
      totalprice: {
        type: Number,
        require: false
      }
    }],

    service: [{
      id: {
        type: String,
        require: false
      },
      name: {
        type: String,
        require: true
      },
      points: {
        type: String,
        require: false
      },

      price: {
        type: String,
        require: false
      },
      date: {
        type: String,
        require: true
      },

    }],




    totalprice: {
      type: Number,
      require: false
    },
    totalpoints: {
      type: Number,
      require: false
    },
    shopid: {
      type: String,
      require: true
    },


    state: {
      type: String,
      require: true
    },
    metod: {
      type: String,
      require: true
    },





  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.OnlineSales || mongoose.model("OnlineSales", StorageScheme);