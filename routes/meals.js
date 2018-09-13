var express = require("express");
var router = express.Router();
var Meal = require("../models/meal");
var User = require("../models/user");
var Plan = require("../models/plan");
var middleware = require("../middleware");

// INDEX - display all meals
router.get("/", function(req, res){
    Meal.find({}, function(err, allMeals){
        if(err){
            console.log(err);
        } else {
            res.render("meals/index", {meals:allMeals});
        }
    });
});

// CREATE - add new meal to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.meal.name;
    var image = req.body.meal.image;
    var ingredients = req.body.meal.ingredients;
    var recipe = req.body.meal.recipe;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var meal = {name: name, image: image, ingredients: ingredients, recipe: recipe, author: author};

    Meal.create(meal, function(err, newMeal){
        if(err){
            console.log(err);
            res.redirect("/meals");
        } else {
            req.flash("success", "Meal created.");
            res.redirect("/meals");
        }
    });
});

// NEW - new meals form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("meals/new");
});

// SHOW - shows info about one meal
router.get("/:id", function(req, res){
    Meal.findById(req.params.id).populate("comments").exec(function(err, foundMeal){
        if(err || !foundMeal){
            req.flash("error", "Meal not found.");
            res.redirect("back");
        } else {
            res.render("meals/show", {meal:foundMeal});
        }
    });
});

// EDIT MEAL
router.get("/:id/edit", middleware.checkMealOwnership, function(req, res){
    Meal.findById(req.params.id, function(err, foundMeal){
        if(err){
            res.redirect("meals");
        } else {
            res.render("meals/edit", {meal: foundMeal});
        }
    });
});

// UPDATE MEAL
router.put("/:id", middleware.checkMealOwnership, function(req, res){
    Meal.findByIdAndUpdate(req.params.id, req.body.meal, function(err, updatedMeal){
        if(err){
            res.redirect("/meals");
        } else {
            req.flash("success", "Meal updated.");
            res.redirect("/meals/" + req.params.id);
        }
    });
});

// ADD MEAL TO PLAN
router.get("/:id/add", middleware.isLoggedIn, function(req,res){
    User.findOne({username: req.user.username}).populate("plans").exec(function(err, foundUser){
        if(err || !foundUser){
            req.flash("error", "User not found.");
            res.redirect("back");
        } else {
            Meal.findById(req.params.id, function(err,foundMeal){
                if(err || !foundMeal){
                    req.flash("error", "Meal not found.");
                    res.redirect("/meals");
                } else {
                    var hasPlans = false;
                    if(foundUser.plans > []) hasPlans = true; 
                    res.render("meals/add", {meal: foundMeal, user: foundUser, hasPlans: hasPlans});
                }
            });
        }
    });
});

// LOGIC FOR ADDING MEAL TO PLAN
router.put("/:id/add", middleware.isLoggedIn, function(req, res){
    // lookup meal using ID
    console.log(req.body);
    Meal.findById(req.params.id, function(err, meal){
        if(err){
            req.flash("error", "Something went wrong.");
            console.log(err);
            res.redirect("/meals");
        } else {
            // add meal id to plan
            // add plan id to meal
            // redirect back to meals index
            Plan.findById(req.body.plan, function(err, plan){
                meal.plans.push(plan);
                meal.save();
                plan.meals.push(meal);
                plan.save();
                req.flash("success", "Meal added.");
                res.redirect("/meals/");
            });
        }
    });
});

// DESTROY MEAL
router.delete("/:id", middleware.checkMealOwnership, function(req, res){
    Meal.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/meals");
        } else {
            req.flash("success", "Meal deleted.");
            res.redirect("/meals");
        }
    });
});


module.exports = router;