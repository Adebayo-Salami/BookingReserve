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
});

module.exports = router;
