var friendData = require("../data/friends.js");
var newFriend;

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function (req, res) {
    friendData.push(req.body);
    res.json(true);
    var newFriend = req.body;
    findDiff(newFriend);
  });
};


function findDiff(newFriend) {
  var diffArray = [];
  var totalDiff = 0;
  var questionDiff = 0;
  for (var i = 0; i < friendData.length; i++) {
    for (var j = 0; j < friendData[i].scores.length; j++) {
      questionDiff = parseInt(friendData[i].scores[j]) - parseInt(newFriend.scores[j]);
      totalDiff = totalDiff + questionDiff;    
    }   
    diffArray.push(totalDiff)
    console.log(diffArray);
  };
 
}