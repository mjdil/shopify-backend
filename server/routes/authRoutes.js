const passport = require('passport');

// this is the route that the user goes to to start the authentification
module.exports = (app)=>{
  app.get('/auth/google',passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

// the google servers send the token back to the callback that is provided here
  app.get('/auth/google/callback',
  passport.authenticate('google'),
  (req,res)=>{
    res.redirect('http://localhost:3000/api/signedin');
}
);

// in order for a secure and complete authorication system a user is able to easily logout
// and save his / her changes
  app.get('/api/logout', (req,res)=>{
    req.logout();
    res.send('you have officially been signed out, thanks for visiting my shopify backend challenge!');
  });

// this is the page that one gets redirected to, right after they sign in, to confirm that you are signed
//in you should see a google profile id!
  app.get('/api/signedin', (req,res)=>{
    res.send("congratulations! you just sign into my shopify API with your secure google credentials! (sorry for the lack of front end!) here is your DB id and your google id:              "+ req.user);
  });

// I added this router to determine the login status of a current user
  app.get('/api/currentuser', (req,res)=>{
    res.send("here is your google id:"+ req.user.googleId);

  })
};
