var express = require("express");
var router = express.Router({mergeParams: true}); // mergeParams is an option set to 'true' so the :id of each site can be found and applied to the route
var Meal = require("../models/meal");

router.get("/new", function(req, res){
    Meal.findById(req.params.id, function(err, meal){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {meal: meal});
        }
    });
});

module.exports = router;