var db = require("../models");
const bcrypt = require('bcrypt');

module.exports = function(app) {
  // Get all Users
  app.post("/api/signin", function(req, res1) {

    
    db.Users.findAll({
      where : {
        username: req.body.username
      }
    }).then(function(dbUsers) {
      // res.json(dbUsers);
      console.log(dbUsers);
      if(dbUsers.length > 0) {
        bcrypt.compare(req.body.password, dbUsers[0].password).then(function(res) {
          console.log("in compare");
          if(res === true) {  
            req.session.userId = dbUsers[0].id;
            req.session.user= dbUsers[0];
            res1.redirect("/dashboard");
            return true;
          }
          
          res1.json({error1: "Incorrect Password"});
        });
      } else {
        res1.json({error2: "Incorrect Username"});
      }
    });
  });

  // Create a new Users
  app.post("/api/Users", function(req, res) {
    console.log ("in api post");
    console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password=hash;
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete an Users by id
  app.delete("/api/Users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new Room
  app.post("/api/Rooms", function(req, res) {
    console.log(req.body);
    db.Rooms.create(req.body).then(function(dbRooms) {
      res.json(dbRooms);
    });
  });
};
