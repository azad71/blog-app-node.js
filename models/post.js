const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   title : {
       type: String,
       required: true,
   },

   author :  {
    type: String,
    required: true,
    },

   category :  {
       type: String,
       required: true,
   },

   description :  {
    type: String,
    required: true,
    },

   comments : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Comment",
    }],
}, {timestamps: true});

module.exports =  mongoose.model("Post", postSchema);