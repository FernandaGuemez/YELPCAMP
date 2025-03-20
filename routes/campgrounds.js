const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

const Campground = require("../models/campground");

// campground index, va a encontrar todos los campgrounds,es decir con toda la base de datos que tenemos de los campgrounds:
// el campgroundCs.index proviene del archivo controllers que representa el patron  MVC(MODELO VISTA CONTROLADOR)
router.get("/", catchAsync(campgrounds.index));

//Renderizas un nuevo campground:
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

//Crear un nuevo campground:
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// (SHOW) mostrar el campground:
router.get("/:id", catchAsync(campgrounds.showCampground));

// Editar y actualizar los campgrounds:
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
