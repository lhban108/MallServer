var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');

var dragModel = require('../models/drag.js')

router.get("/getDragInfo", (req, res, next) => {
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
})

router.post("/saveDragInfo", (req, res, next) => {
  dragModel.find().exec((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        msg: err.message
      })
    } else {
      doc.dragPic = req.body.dragPic
      doc.save((saveErr, saveDoc) => {
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
  })
})

module.exports = router