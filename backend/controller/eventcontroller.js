

const Event = require("../model/event");

// ADD EVENT
const handledEventController = async (req, res) => {
  try {
    const { Title, date, time, location, Description } = req.body;

    if (!Title || !date || !time || !location || !Description) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    await Event.create(req.body);

    res.status(200).json({ message: "Event added successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

// GET EVENT LIST
const handledEventListController = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ EventList: events, TotalCount: events.length, success: true, message: "Events fetched successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

// DELETE EVENT
const handledEventDeleteController = async (req, res) => {
  try {
    const { Id } = req.body;

    if (!Id) {
      return res.status(400).json({ message: "Event ID required", success: false });
    }

    await Event.deleteOne({ _id: Id });
    res.status(200).json({ message: "Event deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

// UPDATE EVENT
const handledEventUpdateController = async (req, res) => {
  try {
    const { Id, ...data } = req.body;

    if (!Id) {
      return res.status(400).json({ message: "Event ID required", success: false });
    }

    await Event.updateOne({ _id: Id }, { $set: data });
    res.status(200).json({ message: "Event updated", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = {
  handledEventController,
  handledEventListController,
  handledEventDeleteController,
  handledEventUpdateController
};
