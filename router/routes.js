const route = require("express").Router();


const controllers = require("../controllers/controllers");

route.get("/", controllers.getIndex);

route.post("/download", controllers.postDownload)


module.exports = route;