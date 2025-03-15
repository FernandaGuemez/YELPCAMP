const { storeReturnTo } = require("../middleware");
const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("users/register");
});

//sirve para registrarse como un nuevo usuario donde colocarás email, username y password. El password tambien ya vendrá hasheado
router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      //en esta parte vamos a hacer que cuando te registres ya no te tengas que logear de nuevo en las partes donde te pide que inicies sesion como en la creacion de un nuevo camprgound, usando un metodo req.login de password
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  })
);

//aqui iniciarás sesion, autenticando con el método .authenticate, y la estrategia local, que  implica verificar un nombre de usuario y contraseña almacenados en la base de datos.

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  //use the storeReturnTo middleware to save the returnTo value from session to res.locals
  storeReturnTo,
  //passport.authenticate logs the user in and clears req.session
  passport.authenticate("local", {
    failureFlash: true /*va a flashear un mensaje para nosotros automaticamente*/,
    failureRedirect: "/login",
  }),
  //now we can use res.locals.returnTo to redirect the user after login
  (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.returnTo || "/campgrounds"; // update this line to use res.locals.returnTo
    res.redirect(redirectUrl);
  }
);

//permitirá cerrar sesion
//aqui se requeire pasar una funcion para que el método .logout funcione
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
