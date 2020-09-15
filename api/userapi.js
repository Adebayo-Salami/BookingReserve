const express = require("express");
const userObject = require("../models/user");
const router = express.Router();
const dbTables = require("../tables");
var MongoClient = require("mongodb").MongoClient;

var Response = {
  ResponseCode: String,
  ResponseMessage: String,
  ResponseObject: Object,
};
