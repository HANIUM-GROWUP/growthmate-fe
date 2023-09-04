var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("get");
    //console.log(req.query['code']);
  res.send("access code 지급 완료");
});