var express = require("express");
var router = express.Router();
var Plan = require("../models/plan");
var User = require("../models/user");
var middleware = require("../middleware");

// INDEX - display all user's meal plans
router.get("/", middleware.isLoggedIn, function(req, res){
    User.findOne({username: req.user.username}).populate("plans").exec(function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "User not found.");
            res.redirect("back");
        } else {
            res.render("plans/index", {user: foundUser});
        }
    });
});

// CREATE - add new meal plan to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // var name = req.body.plan.name;
    // var author = {
    //     id: req.user._id,
    //     username: req.user.username
    // }
    // var plan = {name: name, author: author};

    // Plan.create(plan, function(err, newPlan){
    //     if(err){
    //         console.log(err);
    //         res.redirect("/plans");
    //     } else {
    //         req.flash("success", "Meal plan created.");
    //         res.redirect("/plans");
    //     }
    // });

    // lookup user using ID
    User.findById(req.user._id, function(err, user){
        if(err){
            req.flash("error", "Something went wrong.");
            console.log(err);
            res.redirect("/plans");
        } else {
            // create new meal plan
            // connect new meal plan to user
            // redirect to plans page
            Plan.create(req.body.plan, function(err, plan){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to meal plan
                    plan.author.id = req.user._id;
                    plan.author.username = req.user.username;
                    // save comment
                    plan.save();
                    user.plans.push(plan);
                    user.save();
                    req.flash("success", "Meal Plan created.");
                    res.redirect("/plans/" + plan._id);
                }
            });
        }
    });
});

// NEW - new meals form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("plans/new");
});

// SHOW - shows info about one meal
router.get("/:plan_id", function(req, res){
    Plan.findById(req.params.plan_id).populate("meals").exec(function(err, foundPlan){
        if(err || !foundPlan){
            req.flash("error", "Meal plan not found.");
            res.redirect("back");
        } else {
            res.send("PLAN SHOW PAGE!!!")
            // res.render("plans/show", {plan:foundPlan});
        }
    });
});

// EDIT MEAL PLAN

// DESTROY MEAL
router.delete("/:plan_id", middleware.checkMealOwnership, function(req, res){
    Meal.findByIdAndRemove(req.params.plan_id, function(err){
        if(err){
            res.redirect("/plans");
        } else {
            req.flash("success", "Meal plan deleted.");
            res.redirect("/plans");
        }
    });
});


module.exports = router;