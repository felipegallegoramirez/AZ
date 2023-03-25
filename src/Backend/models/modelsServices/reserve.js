const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    time: {
      type: String, 
      require:true
    },
    date: {
      type: String, 
      require:true
    },
    workstationid: {
      type: String, 
      require:true
    },
    service:{
      id: {
        type:String,
        require:true
      },
      name: {
        type:String,
        require:true
      },
    },
    client:{
      id: {
        type:String,
        require:false
      },
      dni: {
        type:Number,
        require:false
      },
      name: {
        type:String,
        require:false
      },
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

module.exports = mongoose.models.Reserve || mongoose.model("Reserve", StorageScheme);