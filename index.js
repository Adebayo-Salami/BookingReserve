//Importing all dependencies
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const rootApi = require("./api/rootapi");
const userApi = require("./api/userapi");
const eventApi = require("./api/eventapi");

//setting up environment
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
//app.use(cors({origin: "http"}));
http.createServer(app).listen(9000, () => {
  console.log("Server start on port 9000");
});

app.use("/", rootApi);
app.use("/user", userApi);
app.use("/events", eventApi);
