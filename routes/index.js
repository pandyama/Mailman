var express = require("express");
var router = express.Router();
const axios = require("axios").default;

axios.interceptors.request.use(x => {
  x.customData = x.customData || {}
  x.customData.startTime = new Date().getTime();
  return x;
});

axios.interceptors.response.use(x => {
  x.customData = x.customData || {}
  x.customData.time = new Date().getTime() - x.config.customData.startTime
  console.log(`Executed in - ${x.customData.time} ms`);
  // console.log(`Executed in ${x.config.url} - ${new Date().getTime() - x.config.requestStartedAt} ms`);
  return x;
})

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("Route / called render with Mailman");
  res.render("index", { title: "Mailman" });
});

router.post("/data", function (req, res, next) {
  var started = new Date().getTime();
  console.log(req.body.url);
  var result;
  axios
    .get(req.body.url)
    .then((res2) => {
      console.log(res2.data);
      result = res2;
      console.log(JSON.stringify(res2.data).length + JSON.stringify(res2.headers).length + " B");
      console.log(`Difference - ${new Date().getTime() - started} ms`);
      var timeTaken = new Date().getTime() - started;
      var size = JSON.stringify(res2.data).length + JSON.stringify(res2.headers).length;
      res.render("index", { response: res2.data, status: "OK", time: timeTaken, length: size});
    })
    .catch((err) => {
      console.log(err);
      res.render("index", { response: "Request Failed"});
    });

  console.log("users end point called");
  // res.render("index", { response: "No Data"});
});

module.exports = router;
