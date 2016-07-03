var Campground    = require("../models/campground"),
    Comment       = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "Comment not found!");
                    res.redirect("back");
                } else {
                    if(foundComment.author.id.equals(req.user._id)){
                        return next();
                    } else {
                        req.flash("error", "You dont have permission to do that!");
                        res.redirect("back");
                    }
                }
            });        
        } else {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
    };

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.fash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    return next();
                }
            }
        });        
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("/login");
    }
}


module.exports = middlewareObj;