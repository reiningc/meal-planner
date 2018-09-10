var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});

// show registration form
router.get("/register", function(req, res){
    res.render("register");
});

// handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/meals");
        });
    });
});



module.exports = router;