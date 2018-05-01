var friendData = require("../data/friends.js");
var newFriend;

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function (req, res) {
    friendData.push(req.body);
    var newFriend = req.body;
    var diffArray = [];
    var totalDiff = 0;
    var questionDiff = 0;
    var friendName;
    var friendImage;

    for (var i = 0; i < (friendData.length - 1); i++) {
      for (var j = 0; j < friendData[i].scores.length; j++) {
        questionDiff = parseInt(friendData[i].scores[j]) - parseInt(newFriend.scores[j]);
        totalDiff = totalDiff + Math.abs(questionDiff);
      }
      diffArray.push(totalDiff);
      console.log(diffArray);
      totalDiff = 0;
    };
    var lowest = 0;
    for (var i = 1; i < diffArray.length; i++) {
      if (diffArray[i] < diffArray[lowest]) lowest = i;
    }

    friendName = friendData[lowest].name;
    friendImage = friendData[lowest].photo;

    res.json({ friendName: friendName, friendImage: friendImage });
  });
};













//take the index of lowest, go grab the object at that index 
//send that info back to the front end