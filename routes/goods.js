var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var GoodsModule = require('../models/goods')

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall')

// 检查数据库是否连接成功
mongoose.connection.on("connected", _ => {
  console.log('success>>>>>>>>>>>>>>', 'MongoDB connected success!')
})

// 数据库连接出错
mongoose.connection.on("error", _ => {
  console.log('error>>>>>>>>>>>>>>', 'MongoDB connected error!')
})

// 断开连接
mongoose.connection.on("disconnected", _ => {
  console.log('disconnected>>>>>>>>>>>>>>', 'MongoDB connected disconnected!')
})

// 查询商品数据
router.get("/getGoodsList", (req, res, next) => {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let skip = (page - 1) * pageSize;

  let sort = req.param("sort");

  let priceLevel = req.param("priceLevel");
  let priceGt = '';
  let priceLte = '';
  let params = {}
  if (priceLevel !== '1') {
    switch (priceLevel) {
      case '2':
        priceGt = 0;
        priceLte = 100;
        break
      case '3':
        priceGt = 100;
        priceLte = 500;
        break
      case '4':
        priceGt = 500;
        priceLte = 1000;
        break
      case '5':
        priceGt = 1000;
        priceLte = 5000;
        break
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  let totalCount = 0
  // 查询总条数
  let allGoodsModelResult = GoodsModule.find({});
  allGoodsModelResult.exec((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        msg: err.message
      })
    } else {
      totalCount =  doc.length
    }
  })

  // 查询当前数据
  let goodsModelResult = GoodsModule.find(params).skip(skip).limit(pageSize);
  goodsModelResult.sort({"salePrice": sort});
  setTimeout(() => {
    goodsModelResult.exec((err, doc) => {
      if (err) {
        res.json({
          status: "error",
          msg: err.message
        })
      } else {
        res.json({
          status: "success",
          msg: "",
          result: {
            total: totalCount,
            // total: doc.length,
            list: doc
          }
        })
      }
    })
  }, 1500)
})

// 加入到购物车
router.post("/addCart", (req, res, next) => {
  setTimeout(() => {
    const userId = "100000077";
    const productId = req.body.productId;
    // 获取用户模型,通过模型执行API保存数据
    const userModel = require('../models/users');
  
    userModel.findOne({userId: userId}, (userErr, userDoc) => {
      if (userErr) {
        res.json({
          status: "error",
          msg: userErr.message
        })
      } else {
        if (userDoc) {
          let goodsItem = "";
          userDoc.cartList.forEach((item, index) => {
            if (item.productId === productId) {
              goodsItem = item ;
              item.productNum ++ ;
            }
          })
          if (goodsItem) {
            userDoc.save((saveErr, saveDoc) => {
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
          } else {
            GoodsModule.findOne({productId: productId}, (goodsErr, goodsDoc) => {
              if (goodsErr) {
                res.json({
                  status: "error",
                  msg: goodsErr.message
                })
              } else {
                if (goodsDoc) {
                  let goodsObj = JSON.parse(JSON.stringify(goodsDoc)) 
                  goodsObj.productNum = '1';
                  goodsObj.checked = '1';
                  userDoc.cartList.push(goodsObj);
                  userDoc.save((saveErr, saveDoc) => {
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
              }
            })
          }
        }
      }
    })
  }, 2500)
})

module.exports = router