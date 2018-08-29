var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/vgmp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var mealSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Meal = mongoose.model("Meal", mealSchema);

// Meal.create(
//     {
//         name: "Steamed Dumplings", 
//         image: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90a4f62a13955fd92b02cb3ae8c31b94&auto=format&fit=crop&w=500&q=60"
//     }, function(err, meal){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED MEAL: ");
//             console.log(meal);
//         }
//     });


app.get("/", function(req, res){
   res.render("landing");
});

app.get("/meals", function(req, res){
    Meal.find({}, function(err, allMeals){
        if(err){
            console.log(err);
        } else {
            res.render("meals", {meals:allMeals});
        }
    });
});

app.post("/meals", function(req, res){
    Meal.create(req.body.meal, function(err, newMeal){
        if(err){
            console.log(err);
            res.redirect("/meals");
        } else {
            res.redirect("/meals");
        }
    });
});

app.get("/meals/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("Meal Planner server running...")
});