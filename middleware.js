module.exports.isLoggedIn = (req, res, next) => {
  //metodo que te permite autentificar al usuario y poder ingresar si está registrado o no para crear un nuevo campground*/
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // aqui se guarda el link original
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};
