var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Meal       = require("./models/meal"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");

seedDB();

var mealRoutes = require("./routes/meals"),
    indexRoutes = require("./routes/index");

app.use("/", indexRoutes);
app.use("/meals", mealRoutes);

mongoose.connect("mongodb://localhost:27017/vgmp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res){
   res.render("landing");
});



app.listen(3000, function(){
    console.log("Meal Planner server running...")
});