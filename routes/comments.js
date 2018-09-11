var express = require("express");
var router = express.Router({mergeParams: true}); // mergeParams is an option set to 'true' so the :id of each meal can be found and applied to the route
var Meal = require("../models/meal");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    Meal.findById(req.params.id, function(err, meal){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {meal: meal});
        }
    });
});
// CREATE
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
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    meal.comments.push(comment);
                    meal.save();
                    res.redirect("/meals/" + meal._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {meal_id: req.params.id, comment: foundComment});
        }
    });

});

// UPDATE
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/meals/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/meals/" + req.params.id);
        }
    });
});

module.exports = router;