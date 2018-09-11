var Meal = require("../models/meal");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkMealOwnership = function(req, res, next){
    // user logged in?
    if(req.isAuthenticated()){
        Meal.findById(req.params.id, function(err, foundMeal){
            if(err){
                res.redirect("back");
            } else {
                // user owns meal? check using mongoose .equals() to compare meal.author.id (object type) to req.user._id (string)
                if(foundMeal.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.redirect("back");
    }
}


module.exports = middlewareObj;