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

router.post("/signup", (req, res) => {
  //Fetch data from requesty payload
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const password = req.body.Password;
  const email = req.body.EmailAddress;
  const phoneNo = req.body.PhoneNumber;

  const response = UserService.RegisterUser(
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

router.post("/login", (req, res) => {
  //Fetch data from requesty payload
  const email = req.body.Username;
  const password = req.body.Password;

  const response = UserService.LoginUser(email, password);
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

router.get("/events", (req, res) => {
  //Calling Event Service to get all current events

  const response = EventService.GetAllEvents();
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

module.exports = router;
