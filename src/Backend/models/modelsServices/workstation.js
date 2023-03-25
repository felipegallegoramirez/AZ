const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    employee:{
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
      
      blocked: [{
        type:String,
        require:false
      }],

      services:{
        id: {
          type:String,
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

module.exports = mongoose.models.WorkStation || mongoose.model("WorkStation", StorageScheme);