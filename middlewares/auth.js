exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    req.flash("error", "Unauthorized access");
    return res.redirect("back");
  }
  next();
};
