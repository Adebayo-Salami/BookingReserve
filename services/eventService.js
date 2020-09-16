const dbTables = require("../tables");
var MongoClient = require("mongodb").MongoClient;
const ticketObject = require("../models/ticket");
const eventObject = require("../models/event");
const responseObject = require("../models/response");

exports.GetAllEvents = async function () {
  //Connect To The Database Server
  //Connect To The Database Server
  const client = await MongoClient.connect(dbTables.Endpoint, {
    useNewUrlParser: true,
  }).catch((err) => {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  });

  if (!client) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Could not connect!";
    return responseObject;
  }

  try {
    const db = client.db(dbTables.DatabaseName);
    let eventCollection = db.collection(dbTables.EventTable);

    //Query for all events
    let respEvents = await eventCollection.find({}).toArray();

    console.log(respEvents);

    responseObject.IsSuccessful = true;
    responseObject.ErrorMessage = "Success!";
    responseObject.ResponseObject = respEvents;
    return responseObject;
  } catch (err) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  } finally {
    client.close();
  }
};

exports.AddNewEvent = async function (
  name,
  location,
  hostedBy,
  dateOfEvent,
  ticketPrice,
  totalTicketsToBeSold
) {
  if (name == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Event Name Is Required";
    return responseObject;
  }
  if (location == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Event Location Is Required";
    return responseObject;
  }
  if (hostedBy == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Event Host Is Required";
    return responseObject;
  }
  if (dateOfEvent == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Date of Event Is Required";
    return responseObject;
  }
  if (ticketPrice == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Event Ticket Price Is Required";
    return responseObject;
  }
  if (totalTicketsToBeSold == null) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage =
      "Total Tickets to be made available and sold Is Required";
    return responseObject;
  }

  //Create Ticket Object
  eventObject.Name = name;
  eventObject.Location = location;
  eventObject.HostedBy = hostedBy;
  eventObject.DateOfEvent = dateOfEvent;
  eventObject.TicketPrice = ticketPrice;
  eventObject.TotalTicketsToBeSold = totalTicketsToBeSold;

  const client = await MongoClient.connect(dbTables.Endpoint, {
    useNewUrlParser: true,
  }).catch((err) => {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  });

  if (!client) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = "Could not connect!";
    return responseObject;
  }

  try {
    const db = client.db(dbTables.DatabaseName);
    let eventCollection = db.collection(dbTables.EventTable);

    //Add event record to db
    let respAddEvent = await eventCollection.insertOne(eventObject);
    if (respAddEvent.insertedCount == 1) {
      responseObject.IsSuccessful = true;
      responseObject.ErrorMessage = "Event Added Successfully!";
      return responseObject;
    } else {
      responseObject.IsSuccessful = false;
      responseObject.ErrorMessage = "Failed to add event, Pls try again!";
      return responseObject;
    }
  } catch (err) {
    responseObject.IsSuccessful = false;
    responseObject.ErrorMessage = err.message;
    return responseObject;
  } finally {
    client.close();
  }
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
          db.close();
          responseObject.IsSuccessful = false;
          responseObject.ErrorMessage = err.message;
          return responseObject;
        }

        if (data == null) {
          db.close();
          responseObject.IsSuccessful = false;
          responseObject.ErrorMessage = "Event does not exist";
          return responseObject;
        } else {
          eventObject = data;
          if (eventObject.TotalTicketsToBeSold > 0) {
            //Create ticket object
            ticketObject.UserID = userId;
            ticketObject.EventID = eventId;
            ticketObject.DatePurchased = Date.now();
            ticketObject.Price = eventObject.TicketPrice;

            //Save Ticket Object To DB
            africanBulbDB
              .collection(dbTables.TicketTable)
              .insert(ticketObject, (err, ticketData) => {
                if (err) {
                  db.close();
                  responseObject.IsSuccessful = false;
                  responseObject.ErrorMessage = err.message;
                  return responseObject;
                }

                db.close();
                responseObject.IsSuccessful = true;
                responseObject.ErrorMessage = "Ticket Reserved Successful!";
                return responseObject;
              });
          } else {
            db.close();
            responseObject.IsSuccessful = false;
            responseObject.ErrorMessage = "Tickets are sold out!";
            return responseObject;
          }
        }
      });
  });
};
