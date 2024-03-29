const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const getRecipes = require("./routes/getRecipes");
const postRecipes = require("./routes/postRecipes");
const getDiets = require("./routes/getDiets");
const deleteRecipes = require("./routes/deleteRecipe");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://pi-food-pi.vercel.app"); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Origin", "https://localhost:3001"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/recipes", getRecipes); //si la ruta dice /recipes se va para getRecipes por eso no hace falta ahi pasarle /recipes.
server.use("/post", postRecipes);
server.use("/diets", getDiets);
server.use("/delete", deleteRecipes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
