var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
   res.render("landing");
});

app.get("/meals", function(req, res){
    var meals = [
        {name: "Ensalada Fruita Fresca", image: "https://images.unsplash.com/photo-1531104048215-632162c6af26?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af73f2b6c701b9002b85ac1425607d5f&auto=format&fit=crop&w=500&q=60"},
        {name: "Steamed Dumplings", image: "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90a4f62a13955fd92b02cb3ae8c31b94&auto=format&fit=crop&w=500&q=60"},
        {name: "Fancy Avocado Toast", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e36121c3c0d935f861d76d45b1bf0e70&auto=format&fit=crop&w=500&q=60"}
    ]
    res.render("meals", {meals:meals});
});

app.post("/meals", function(req, res){
    res.send("YOU HIT THE POST ROUTE ADD THAT MEAL BABBY!!");
});

app.get("/meals/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("Meal Planner server running...")
});