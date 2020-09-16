const express = require("express");
const router = express.Router();
const UserService = require("../services/userService");
const EventService = require("../services/eventService");

var Response = {
  ResponseCode: String,
  ResponseMessage: String,
  ResponseObject: Object,
};

router.get("/", (req, res) => {
  console.log("It hit root controller");
  (Response.ResponseCode = "00"), (Response.ResponseMessage = "It got here");
  res.json(Response);
});

router.post("/signup", async (req, res) => {
  //Fetch data from requesty payload
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const password = req.body.Password;
  const email = req.body.EmailAddress;
  const phoneNo = req.body.PhoneNumber;

  const response = await UserService.RegisterUser(
    lastName,
    firstName,
    phoneNo,
    email,
    password
  );

  if (response.IsSuccessful == false) {
    Response.ResponseCode = "-01";
    Response.ResponseMessage = response.ErrorMessage;
    res.json(Response);
    return;
  } else {
    Response.ResponseCode = "00";
    Response.ResponseMessage = response.ErrorMessage;
    res.json(Response);
    return;
  }
});

router.post("/login", async (req, res) => {
  //Fetch data from requesty payload
  const email = req.body.Username;
  const password = req.body.Password;

  const response = await UserService.LoginUser(email, password);
  if (response.IsSuccessful == true) {
    Response.ResponseCode = "00";
    Response.ResponseMessage = response.ErrorMessage;
    Response.ResponseObject = response.ResponseObject;
    res.json(Response);
    return;
  } else {
    Response.ResponseCode = "-01";
    Response.ResponseMessage = response.ErrorMessage;
    res.json(Response);
    return;
  }
});

router.get("/events", async (req, res) => {
  //Calling Event Service to get all current events

  const response = await EventService.GetAllEvents();
  if (response.IsSuccessful == true) {
    Response.ResponseCode = "00";
    Response.ResponseMessage = "Records Successfullly Retrieved";
    Response.ResponseObject = response.ResponseObject;
    res.json(Response);
  } else {
    Response.ResponseCode = "-01";
    Response.ResponseMessage = response.ErrorMessage;
    res.json(Response);
    return;
  }
});

router.post("/events", async (req, res) => {
  //Fetch data from request payload
  const eventName = req.body.EventName;
  const eventLocation = req.body.EventLocation;
  const eventHost = req.body.EventHost;
  const eventDate = req.body.DateOfEvent;
  const eventTicketPrice = req.body.EventTicketPrice;
  const totalTicketToBeAvailable = req.body.TotalTicketsToBeAvailable;

  const response = await EventService.AddNewEvent(
    eventName,
    eventLocation,
    eventHost,
    eventDate,
    eventTicketPrice,
    totalTicketToBeAvailable
  );
  if (response.IsSuccessful == true) {
    Response.ResponseCode = "00";
    Response.ResponseMessage = "Event Added Successfullly";
    res.json(Response);
    return;
  } else {
    Response.ResponseCode = "-01";
    Response.ResponseMessage = "Event Failed to Add";
    res.json(Response);
    return;
  }
});

module.exports = router;
