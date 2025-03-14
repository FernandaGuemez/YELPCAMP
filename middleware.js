module.exports.isLoggedIn = (req, res, next) => {
  console.log("REQ.USER...", req.user);
  if (!req.isAuthenticated()) {
    //metodo que te permite autentificar al usuario y poder ingresar si está registrado o no para crear un nuevo campground*/
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};
