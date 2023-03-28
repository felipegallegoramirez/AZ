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
    password: {
      type: String,
      require: true,
    },
    dni: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    phone: {
      type: Number,
      require: true
    },
    verified: {
      state: {
        type: Number,
        require: false
      },
      code: {
        type: Number,
        require: false
      },
    },

    shop: {
      id: {
        type: String,
        require: true
      },
      permissions: [{
        type: Number,
        require: true
      }]
    },
    ips:[{
        type: String,
        require: true
      }]
    },


  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Users || mongoose.model("Users", StorageScheme);