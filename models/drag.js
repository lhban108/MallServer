var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dragSchema = new Schema(({
  "bgPic": [{
    "bgImg": String,
    "bgWidth": Number,
    "bgHeight": Number
  }],
  dragPic: [{
    "dragImg": String,
    "dragWidth": Number,
    "dragHeight": Number,
    "dragColX": Number,
    "dragColY": Number,
    "pageNum": Number,
    "classFlag": String
  }]
}))

module.exports = mongoose.model('Drag', dragSchema)
