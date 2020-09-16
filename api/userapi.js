const express = require("express");
const UserService = require("../services/userService");
const router = express.Router();

var Response = {
  ResponseCode: String,
  ResponseMessage: String,
  ResponseObject: Object,
};

router.get("/tickets", async (req, res) => {
  //Fetch User ID From Payload
  const userId = req.body.UserID;
  const eventId = req.body.EventID;

  const response = await UserService.GetUserTicketsForEvent(userId, eventId);
  if (response.IsSuccessful == true) {
    Response.ResponseCode = "00";
    Response.ResponseMessage = "Records Fetched Successfullly";
    Response.ResponseObject = response.ResponseObject;
    res.json(Response);
    return;
  } else {
    Response.ResponseCode = "-01";
    Response.ResponseMessage = response.ErrorMessage;
    return;
  }
});

module.exports = router;
