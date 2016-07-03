var express         = require("express"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    middleware      = require("../middleware/index.js"),
    User            = require("../models/user"),
    router          = express.Router();

//Not logged in route
router.get("/not-logged-in", function(req, res){
    res.render("notLoggedIn");
});

//Root Route
router.get("/", function(req, res){
    res.render("landing");
});

//Show login form
router.get("/login", function(req, res){
    res.render("login");
});

//Handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//Show register form
router.get("/register", function(req, res){
    res.render("register");
});

//Handle register logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds"); 
            });
        }
    });
});

//Handle Logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/");
});

module.exports = router;