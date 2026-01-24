const EventRegistration = require("../model/eventRegistration");

// REGISTER FOR EVENT
const registerForEvent = async (req, res) => {
  try {
    const { name, email, mobile, eventName, department, year } = req.body;

    if (!name || !email || !mobile || !eventName || !department || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate registration
    const alreadyRegistered = await EventRegistration.findOne({
      email,
      eventName
    });

    if (alreadyRegistered) {
      return res.status(409).json({
        message: "You are already registered for this event"
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
      message: "Event registration successful 🎉"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET PARTICIPANTS BY EVENT NAME
const getParticipantsByEvent = async (req, res) => {
  try {
    const { eventName } = req.params;

    const participants = await EventRegistration.find({ eventName });

    res.status(200).json({ participants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerForEvent,
  getParticipantsByEvent
};
