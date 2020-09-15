const dbTables = require("../tables");
var MongoClient = require("mongodb").MongoClient;
const userObject = require("../models/user");
const responseObject = require("../models/response");

exports.GetAllEvents = function () {
  //Connect To The Database Server
  MongoClient.connect(dbTables.Endpoint, (err, db) => {
    if (err) {
      responseObject.IsSuccessful = false;
      responseObject.ErrorMessage = err.message;
      return responseObject;
    }
    var africanBulbDB = db.db(dbTables.DatabaseName);
    africanBulbDB
      .collection(dbTables.EventTable)
      .find({})
      .toArray(function (err, result) {
        if (err) {
          responseObject.IsSuccessful = false;
          responseObject.ErrorMessage = err.message;
          return responseObject;
        }

        db.close();
        responseObject.IsSuccessful = true;
        responseObject.ErrorMessage = "Retrieved Successfully";
        responseObject.ResponseObject = result;
      });
  });
};
