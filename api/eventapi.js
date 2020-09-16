const express = require("express");
const router = express.Router();
const EventService = require("../services/eventService");

var Response = {
  ResponseCode: String,
  ResponseMessage: String,
  ResponseObject: Object,
};

router.get("/:eventId/ticket", (req, res) => {
  //Get Event ID
  const eventId = req.params.eventId;
  const userId = req.body.userId;

  const response = EventService.PurchaseEventTicket(eventId, userId);
  if (response.IsSuccessful) {
    Response.ResponseCode = "00";
    Response.ResponseMessage = "Ticket Reserved Successfully";
    res.json(Response);
    return;
  } else {
    Response.ResponseCode = "-01";
    Response.ResponseMessage = response.ErrorMessage;
    res.json(Response);
    return;
  }
});

module.exports = router;
