const EventRegistration = require("../model/eventRegistration");

// REGISTER FOR EVENT
const registerForEvent = async (req, res) => {
  try {
    const { name, email, mobile, eventName, department, year } = req.body;

    if (!name || !email || !mobile || !eventName || !department || !year) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Prevent duplicate registration
    const alreadyRegistered = await EventRegistration.findOne({
      email,
      eventName
    });

    if (alreadyRegistered) {
      return res.status(409).json({
        message: "You are already registered for this event",
        success: false
      });
    }

    await EventRegistration.create({
      name,
      email,
      mobile,
      eventName,
      department,
      year
    });

    res.status(201).json({
      message: "Event registration successful 🎉",
      success: true
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

// GET PARTICIPANTS BY EVENT NAME
const getParticipantsByEvent = async (req, res) => {
  try {
    const { eventName } = req.params;

    const participants = await EventRegistration.find({ eventName });

    res.status(200).json({ participants, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

/* 
// OLD LOGIC (Stored for reference, can be deleted later)
const Event = require("../model/event");
const User = require("../model/user");

const registerForEvent_OLD = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    ...
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/

module.exports = {
  registerForEvent,
  getParticipantsByEvent
};
