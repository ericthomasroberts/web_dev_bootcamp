var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    Campground      = require("./models/campground"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comment"),
    expressSession  = require("express-session"),
    seedDB          = require("./seeds");   

//Requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

//Seed the Database
// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(expressSession({
    secret: "This is the secret line",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server running");
});