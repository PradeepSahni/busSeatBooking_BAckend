const express = require("express");
let app = express();
let router = express.Router();
const bodyParser = require("body-parser");
const initApiRoutes = require("./routes/api");
var cors = require("cors");
require("dotenv").config();


// const salt = genSaltSync(10);
// let pass = hashSync('#Mazall@123', salt);
// console.log("pass",pass)
// logger.info(`Get Canceled Subscription.`);

app.use(bodyParser.json());
// app.use(express.bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));



app.use(express.static("public"));

var corsOptions = {
  origin: "*",
  changeOrigin: true,
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));



app.use("/", router);
initApiRoutes(app);

app.listen(process.env.PORT, () =>
  console.log(`Node-js Server running on port ${process.env.PORT}`)
);
