var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');

var dragModel = require('../models/drag.js')

router.get("/getDragInfo", (req, res, next) => {
  setTimeout(() => {
    dragModel.find().exec((err, doc) => {
      if (err) {
        res.json({
          status: "error",
          msg: err.message
        })
      } else {
        res.json({
          status: "success",
          msg: "",
          result: doc
        })
      }
    })
  }, 1500)

})

router.post("/saveDragInfo", (req, res, next) => {
  setTimeout(() => {
    dragModel.find().exec((err, doc) => {
      if (err) {
        res.json({
          status: "error",
          msg: err.message
        })
      } else {
        doc[0].dragPic = req.body.dragPic
        doc[0].save((saveErr, saveDoc) => {
          if (saveErr) {
            res.json({
              status: "error",
              msg: saveErr.message
            })
          } else {
            res.json({
              status: "success",
              msg: "",
              result: "add success"
            })
          }
        });
      }
    }, 1500)
  })
})

module.exports = router