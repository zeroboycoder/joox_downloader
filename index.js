const express = require("express");
const app = express();
const bodyParser = require("body-parser");


const routes = require("./router/routes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.disable("x-powered-by")
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server is running"));