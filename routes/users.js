var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
// router.post('/', function(req, res, next) {
//   console.log(req.body.url);

//   axios.get(req.body.url)
//     .then((res)=>{
//       console.log(res.data);
//     })
//     .catch((err)=>{
//       console.log(err);
//     })

//   console.log("users end point called");
//   // res.send('respond with a resource');
//   res.render('index', { response: res.data });
// });

module.exports = router;
