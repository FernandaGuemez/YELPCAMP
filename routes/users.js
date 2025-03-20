const { storeReturnTo } = require("../middleware");
const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const users = require("../controllers/users");

router.get("/register", users.renderRegister);

//sirve para registrarse como un nuevo usuario donde colocarás email, username y password. El password tambien ya vendrá hasheado
router.post("/register", catchAsync(users.register));

//aqui iniciarás sesion, autenticando con el método .authenticate, y la estrategia local, que  implica verificar un nombre de usuario y contraseña almacenados en la base de datos.

router.get("/login", users.renderLogin);

router.post(
  "/login",
  //use the storeReturnTo middleware to save the returnTo value from session to res.locals
  storeReturnTo,
  //passport.authenticate logs the user in and clears req.session
  passport.authenticate("local", {
    failureFlash: true /*va a flashear un mensaje para nosotros automaticamente*/,
    failureRedirect: "/login",
  }),
  users.login
);

//permitirá cerrar sesion
//aqui se requeire pasar una funcion para que el método .logout funcione
router.get("/logout", users.logout);

module.exports = router;
