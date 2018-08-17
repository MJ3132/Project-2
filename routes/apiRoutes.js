var db = require("../models");
var bcrypt = require("bcrypt");

function showErrorUsernameDoesNotExist2() {
  showErrorUsernameDoesNotExist();
}

module.exports = function (app) {
  app.post("/api/login", function (req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (dbUser) {
      if(dbUser) {
        bcrypt.compare(req.body.password, dbUser.password, function(err, res) {
          if(res) {
            console.log("passwords match!");
          }
          else {
            document.getElementById("LoginError").style.display = "block";
          }
        });
      } 
      else {
        //username does not exist
        console.log("username does not exist");
        showErrorUsernameDoesNotExist2();
      }
      res.json(dbUser);
    });
  });

  app.get("/api/users/:username", function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  //   app.get("/api/users", function (req, res) {
  //     db.User.findAll({}).then(function (dbUsers) {
  //       res.json(dbUsers);
  //     });
  //   });

  app.post("/api/users", function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        res.json("bcrypt failed");
      } else {
        db.User.create({
          username: req.body.username,
          password: hash
        }).then(function (dbUser) {
          res.json(dbUser);
        });
      }
    });
  });

  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
