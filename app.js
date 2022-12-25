const express = require("express");
const path = require("path");
const app = express();
//sequelize
const productRouterV2 = require("./app/product2/routes");

const res = require("express/lib/response");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "upload")));

//sequelize
app.use("/api/v2", productRouterV2);

app.use((req, res, next) => {
  // app.use((err, req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource " + req.originalUrl + " Not Found",
  });
});

app.listen(5000, () => console.log("server: http://localhost:5000"));
