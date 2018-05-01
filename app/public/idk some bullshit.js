module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
    var friendName = "";
    var friendImage = "";
    var differenceTotal = "99999";
    var userAnswers = req.body;
    var userScores = userAnswers.scores;

		for (var i = 0; i < friendData.length; i++) {

			var difference = 0;
			for (var x = 0; x < userScores.length; x++) {
				difference += Math.abs(friendData[i].scores[x] - userScores[x]);
			}

			if (difference < differenceTotal) {

				differenceTotal = difference;
				friendName = friendData[i].name;
        friendImage = friendData[i].photo;
        
        console.log("friend match name: " + friendName);

			}
		}

    friendData.push(userAnswers);

    res.json({status: 'OK', friendName: friendName, friendImage: friendImage});
  });



};