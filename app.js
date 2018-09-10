var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Meal            = require("./models/meal"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

var mealRoutes = require("./routes/meals"),
    indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments");

mongoose.connect("mongodb://localhost:27017/vgmp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Jack is a peanut",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to add currentUser to the list of objects passed within each route
app.use(function(req, res, next){
    res.locals.currentUser = req.user; // req.user comes from passport
    next();
});

app.use("/", indexRoutes);
app.use("/meals", mealRoutes);
app.use("/meals/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("Meal Planner server running...")
});