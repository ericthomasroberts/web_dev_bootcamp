var express        = require("express"),
    Campground     = require("../models/campground"),
    middleware     = require("../middleware/index.js"),
    router         = express.Router();


//Show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error");
        } else {
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
});

//New Campground Form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//Create New Campground
router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.newCampgroundName;
   var image = req.body.newCampgroundImage;
   var desc = req.body.newCampgroundDesc;
   var campgroundAuthor = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, desc: desc, author: campgroundAuthor};
   Campground.create(newCampground, function(err, newlyAdded){
       if(err){
           console.log("Error");
       } else {
           res.redirect("/campgrounds");
       }
   });
});

//View Campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Error");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;