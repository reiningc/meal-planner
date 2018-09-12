var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");
var Plan = require("../models/plan");
var middleware = require("../middleware");


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
            req.flash("error", err.message);
            return res.redirect("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Very Good Meal Planner, " + user.username + "!");
            res.redirect("/meals");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handle login logic
router.post("/login", 
    passport.authenticate("local", 
        {
            successRedirect: "/plans",
            failureRedirect: "/login"
        }), 
    function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out.");
    res.redirect("/meals");
});

// user route
router.get("/u/:user_id", function(req, res){
    User.findOne({username: req.params.user_id}).populate("plans").exec(function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "User not found.");
            res.redirect("back");
        } else {
            res.render("profile", {user: foundUser});
        }
    });
});

module.exports = router;