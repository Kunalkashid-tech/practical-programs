module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view this resource');
      res.redirect('/auth/login');
    },
    ensureAdmin: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
      }
      req.flash('error_msg', 'You are not authorized to view this resource');
      res.redirect('/');
    }
  };
  