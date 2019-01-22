const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


//this is the mongoose model that represents a collection in the DB
const User = mongoose.model('user');



//over here we are telling passport to use cookie authentification and
// so because of this we add a cookie to every request that authrizes
// weather a user is signed in or not
// to encode the users login info
passport.serializeUser((existingUser, done)=>{
  done(null, existingUser.id);
});

// this is the decoding of the user token into the tangible user object
passport.deserializeUser((id, done)=>{
  User.findById(id).then((user)=>{
    done(null, user);
  })
});

// the callback getd executed when we get information back from
// google servers, and then we can use that information to use in
// our api, over here we are making a user model, and storing it
// in the database!


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
// over here I am using async/await instead of promises/callbacks
// i am doing this to showcase the multiple methods of writing async code
// normally, i would be consistent with async/await
    async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({googleId: profile.id});
        if (existingUser){
          console.log('user already exists');
          // we need to tell passport that we are done
          done(null, existingUser);
        }
        else{
        const existingUser = await new User({googleId: profile.id}).save();
            done(null, existingUser);

        }


    }
  )
);
