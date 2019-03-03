
// var routes = require("../data/friends")


// module.exports = (app) => {

//     app.get('/api/friends',  function (req, res) {
//         res.json(routes)
//       });


//     app.post('/api/friends', function (req, res) {
//         res.json(req.body)
//       });
//       for()
// }

var express = require("express");
var path = require("path");
var router = express.Router();
var data = require("../data/friends.js")



module.exports = function (router) {
  router.get("/api/friends", function (req, res) {
    return res.json(data);
  });

  router.post("/api/friends", function (req, res) {
    if (data.length === 0) {
      res.send({
        name: "N/A",
        photo: "Insert Image Here"
      });
      return;

    };

    var postInfo = req.body;

    var allScores = [];

    for (let i = 0; i < data.lenght; i++) {
      var total = 0;
      for (let j = 0; j < postInfo.score.length; j++) {
        let myScore = postInfo.score[j];
        let theirScore = data[i].scores[j];
        let questionDiff = Math.abs(myScore - theirScore);

        total += questionDiff;
      }
      allScores[i] = total;
    }

    var lowScore = 9999;
    var bestMatchIndex = 0;

    for (let i = 0; i < allScores.length; i++) {
      if (allScores[i] < lowScore) {
        lowScore = allScores[i];
        bestMatchIndex = i;
      }
    }

    if (postInfo.isGonnaSave === "true") {
      let personals = {
        name: postInfo.name,
        photo: postInfo.photo,
        scores: postInfo.scores
      }
      defaultStatus.push(personals);
    }

    res.send({
      name: data[bestMatchIndex].name,
      photo: data[bestMatchIndex].photo,
      compatibility: parseInt(100 - Math.round((lowScore / 40) * 100))
    });

  });
}
