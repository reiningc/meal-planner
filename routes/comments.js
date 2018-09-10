var express = require("express");
var router = express.Router({mergeParams: true}); // mergeParams is an option set to 'true' so the :id of each meal can be found and applied to the route
var Meal = require("../models/meal");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Meal.findById(req.params.id, function(err, meal){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {meal: meal});
        }
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup meal using ID
    Meal.findById(req.params.id, function(err, meal){
        if(err){
            console.log(err);
            res.redirect("/meals");
        } else {
            // create new comment
            // connect new comment to meal
            // redirect to meal show page
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    meal.comments.push(comment);
                    meal.save();
                    res.redirect("/meals/" + meal._id);
                }
            });
        }
    });
});

module.exports = router;