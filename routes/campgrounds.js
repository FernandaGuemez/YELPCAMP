const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Campground = require("../models/campground");

router
  .route("/") // campground index, va a encontrar todos los campgrounds,es decir con toda la base de datos que tenemos de los campgrounds:
  // el campgroundCs.index proviene del archivo controllers que representa el patron  MVC(MODELO VISTA CONTROLADOR)
  .get(catchAsync(campgrounds.index))
  // Crear un nuevo campground:
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );
// // .post(upload.array("image"), (req, res) => {
// console.log(req.body, req.files);
// //   res.send("IT WORKED!?");
// // });

//Renderizas un nuevo campground:
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  // (SHOW) mostrar el campground:
  .get(catchAsync(campgrounds.showCampground))

  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// Editar y actualizar los campgrounds:
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
