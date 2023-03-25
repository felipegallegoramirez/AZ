const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    name:{
        type: String,
        required: true,
        unique: true,
      },
    listserviceid: {
        type:[String],
        require:true
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

module.exports = mongoose.models.ServiceCategory || mongoose.model("ServiceCategory", StorageScheme);