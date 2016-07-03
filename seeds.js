var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {name: "Clouds Rest", 
        image: "http://thegypsynomads.com/wp-content/uploads/2013/08/Untitled2-e1376498969962.png",
        desc: "Four dollar toast knausgaard post-ironic man bun raw denim everyday carry, swag chicharrones scenester schlitz sriracha locavore chartreuse. Flannel heirloom banh mi" +
        "squid beard normcore. Mustache ramps messenger bag health goth, fanny pack wolf occupy pour-over franzen next level tote bag lumbersexual pop-up. Swag butcher migas occupy meditation." + 
        "Wolf williamsburg pinterest, chia direct" +
        "trade humblebrag kale chips stumptown hella scenester drinking vinegar hoodie kogi godard. Dreamcatcher meditation everyday carry beard cliche, hoodie vice blog before they sold out" +
        "occupy squid tote bag. Asymmetrical blue bottle austin street art, blog fanny pack listicle green juice sustainable messenger bag brooklyn."
        },
        {name: "Cool Valley", 
        image: "http://thegypsynomads.com/wp-content/uploads/2013/08/Untitled3-e1376499060652.png",
        desc: "Four dollar toast knausgaard post-ironic man bun raw denim everyday carry, swag chicharrones scenester schlitz sriracha locavore chartreuse. Flannel heirloom banh mi" +
        "squid beard normcore. Mustache ramps messenger bag health goth, fanny pack wolf occupy pour-over franzen next level tote bag lumbersexual pop-up. Swag butcher migas occupy meditation." + 
        "Wolf williamsburg pinterest, chia direct" +
        "trade humblebrag kale chips stumptown hella scenester drinking vinegar hoodie kogi godard. Dreamcatcher meditation everyday carry beard cliche, hoodie vice blog before they sold out" +
        "occupy squid tote bag. Asymmetrical blue bottle austin street art, blog fanny pack listicle green juice sustainable messenger bag brooklyn."
        },
        {name: "By the Ocean", 
        image: "http://stockarch.com/files/13/10/winderness_camping.jpg",
        desc: "Four dollar toast knausgaard post-ironic man bun raw denim everyday carry, swag chicharrones scenester schlitz sriracha locavore chartreuse. Flannel heirloom banh mi" +
        "squid beard normcore. Mustache ramps messenger bag health goth, fanny pack wolf occupy pour-over franzen next level tote bag lumbersexual pop-up. Swag butcher migas occupy meditation." + 
        "Wolf williamsburg pinterest, chia direct" +
        "trade humblebrag kale chips stumptown hella scenester drinking vinegar hoodie kogi godard. Dreamcatcher meditation everyday carry beard cliche, hoodie vice blog before they sold out" +
        "occupy squid tote bag. Asymmetrical blue bottle austin street art, blog fanny pack listicle green juice sustainable messenger bag brooklyn."  
        }
    ];


function seedDB() {
    Campground.remove({}, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("removed campgrounds!");        
    }
    });
    
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){
              console.log("error");
          } else{
              console.log("created a campground");
              Comment.create({
                  text: "this place is great but I wish there was internet",
                  author: "Homer"
          }, function(err, comment){
              if(err){
                  console.log("error");
              } else{
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Created new comments");
              }
          });
          }
      }); 
    });
}

module.exports = seedDB;
