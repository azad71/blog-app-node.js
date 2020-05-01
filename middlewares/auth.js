exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("Unauthorized access not granted");
    return res.redirect("back");
  }
  next();
};
