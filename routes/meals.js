var express = require("express");
var router = express.Router();
var Meal = require("../models/meal");

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
router.post("/", function(req, res){
    Meal.create(req.body.meal, function(err, newMeal){
        if(err){
            console.log(err);
            res.redirect("/meals");
        } else {
            res.redirect("/meals");
        }
    });
});

// NEW - new meals form
router.get("/new", function(req, res){
    res.render("meals/new");
});

// SHOW - shows info about one meal
router.get("/:id", function(req, res){
    Meal.findById(req.params.id).populate("comments").exec(function(err, foundMeal){
        if(err){
            console.log(err);
        } else {
            res.render("meals/show", {meal:foundMeal});
        }
    });
});

module.exports = router;