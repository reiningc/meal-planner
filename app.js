var express = require("express");
var app = express();


app.get("/", function(err, res){
   res.render("home");
});


app.listen(3000, function(){
    console.log("Meal Planner server running...")
});