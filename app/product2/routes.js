const router = require("express").Router();
const Product = require("./model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: "upload" });
const connection = require("../../config/sequelize");
const productController = require("./controller");

router.get("/product", productController.index);

router.get("/product/:id", productController.view);

//input

router.post("/product", upload.single("image"), productController.store);
router.put("/product/:id", upload.single("image"), productController.update);
router.delete(
  "/product/:id",
  upload.single("image"),
  productController.destroy
);

module.exports = router;
