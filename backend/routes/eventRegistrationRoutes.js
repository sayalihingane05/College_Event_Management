const express = require("express");
const {
  registerForEvent,
  getParticipantsByEvent
} = require("../controller/eventRegistrationController");

const router = express.Router();

// Register for an event
router.post("/register", registerForEvent);

// Get all participants of a specific event
router.get("/:eventName", getParticipantsByEvent);

module.exports = router;
