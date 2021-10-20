const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("IT WORKED");
});
app.get("/users", function (req, res) {
  res.json([
    {
      "_id": "617017c839ebc554484dce3f",
      "isActive": true,
      "age": 26,
      "name": "Cleo Jimenez",
      "gender": "female",
      "email": "cleojimenez@undertap.com",
      "phone": "+1 (942) 428-2345",
      "address": "542 Walker Court, Winchester, North Carolina, 2969",
      "registered": "2018-11-28T06:56:37 -06:-30"
    },
    {
      "_id": "617017c8e1e01e7647fc3d23",
      "isActive": false,
      "age": 37,
      "name": "Oneil Hughes",
      "gender": "male",
      "email": "oneilhughes@undertap.com",
      "phone": "+1 (884) 509-2086",
      "address": "105 Poplar Avenue, Lindcove, Oklahoma, 1315",
      "registered": "2018-05-14T11:38:28 -06:-30"
    },
    {
      "_id": "617017c835ded28ecbcf463c",
      "isActive": true,
      "age": 30,
      "name": "Savannah Mosley",
      "gender": "female",
      "email": "savannahmosley@undertap.com",
      "phone": "+1 (980) 443-3953",
      "address": "241 Greenwood Avenue, Forestburg, Massachusetts, 9016",
      "registered": "2014-09-01T10:58:28 -06:-30"
    },
    {
      "_id": "617017c89918a0345a44b41d",
      "isActive": false,
      "age": 22,
      "name": "Murray Drake",
      "gender": "male",
      "email": "murraydrake@undertap.com",
      "phone": "+1 (996) 529-2787",
      "address": "317 Louisiana Avenue, Nipinnawasee, Iowa, 9072",
      "registered": "2014-05-03T06:09:06 -06:-30"
    },
    {
      "_id": "617017c87a5e9e6b62dcc877",
      "isActive": true,
      "age": 26,
      "name": "Nita Carr",
      "gender": "female",
      "email": "nitacarr@undertap.com",
      "phone": "+1 (992) 460-2436",
      "address": "463 Crawford Avenue, Woodburn, Virgin Islands, 3532",
      "registered": "2018-05-30T09:16:31 -06:-30"
    },
    {
      "_id": "617017c8907e62b90c8c9ad0",
      "isActive": false,
      "age": 21,
      "name": "Joseph Collier",
      "gender": "male",
      "email": "josephcollier@undertap.com",
      "phone": "+1 (845) 485-3877",
      "address": "232 Howard Avenue, Hebron, American Samoa, 4124",
      "registered": "2016-11-05T08:13:19 -06:-30"
    },
    {
      "_id": "617017c8c480e569d5d70331",
      "isActive": false,
      "age": 31,
      "name": "Whitney Hatfield",
      "gender": "female",
      "email": "whitneyhatfield@undertap.com",
      "phone": "+1 (947) 418-3285",
      "address": "541 Karweg Place, Dellview, Hawaii, 3628",
      "registered": "2020-12-05T11:55:26 -06:-30"
    }
  ]);
});

app.listen(process.env.PORT || 5000);
module.exports = app;
