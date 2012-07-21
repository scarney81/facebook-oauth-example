var passport = require('passport');

module.exports = function(app) {
  app.get('/', passport.authenticate('facebook'));

  app.get('/logout', function(req, res, next) {
    req.logout();
    req.session.destroy();
  });

  app.get('/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), function(req, res, next) {
   // Successful authentication, redirect to profile.
   console.log("USER: ", req.user);
   res.redirect('/profile');
  });
  
  app.get('/profile', function(req, res, next) {
    console.log("PROFILE: ", req.user);
    res.render('profile', { user: JSON.stringify(req.user) });
  });

  app.get('/error', function(req, res, next) {
    res.render('error');
  });
};