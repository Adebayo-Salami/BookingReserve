const dbTables = require("../tables");
var MongoClient = require("mongodb").MongoClient;
const ticketObject = require("../models/ticket");
const eventObject = require("../models/event");
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
        return responseObject;
      });
  });
};

exports.PurchaseEventTicket = function (eventId, userId) {
  if (eventId == null || eventId <= 0) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Invalid Event ID";
    return responseObject;
  }

  if (userId == null || userId <= 0) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Invalid Event ID";
    return responseObject;
  }

  //First Check how many tickets available
  eventObject.ID = eventId;

  MongoClient.connect(dbTables.Endpoint, (err, db) => {
    if (err) {
      responseObject.IsSuccessful = false;
      responseObject.ErrorMessage = err.message;
      return responseObject;
    }
    var africanBulbDB = db.db(dbTables.DatabaseName);
    africanBulbDB
      .collection(dbTables.EventTable)
      .findOne(eventObject, (err, data) => {
        if (err) {
          responseObject.IsSuccessful = false;
          responseObject.ErrorMessage = err.message;
          return responseObject;
        }

        if (data == null) {
          responseObject.IsSuccessful = false;
          responseObject.ErrorMessage = "Event does not exist";
          return responseObject;
        }

        db.close();

        responseObject.IsSuccessful = true;
        responseObject.ErrorMessage = "Authentication Successful";
        responseObject.ResponseObject = data;
        return responseObject;
      });
  });

  //Create ticket object
  ticketObject.UserID = userId;
  ticketObject.EventID = eventId;
  ticketObject.DatePurchased = Date.now();
};
