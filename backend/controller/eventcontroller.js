

const Event = require("../model/event");

// ADD EVENT
const handledEventController = async (req, res) => {
  try {
    const data = req.body;
    console.log("Received:", data);

    if (!data.Title || !data.date || !data.time || !data.location || !data.Description) {
      return res.status(400).json({ Message: "All fields are required", Success: false });
    }

    const Eventdata = await Event.create(data); // ✅ use create, not insertOne
    if (Eventdata) {
      return res.status(200).json({ Message: "Data added successfully", Success: true });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message, Success: false });
  }
};

// GET EVENT LIST
const handledEventListController = async (req, res) => {
  try {
    const Eventlist = await Event.find({});
    return res.status(200).json({
      Message: "Data get successfully",
      Success: true,
      EventList: Eventlist,
      TotalCount: Eventlist.length
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message, Success: false });
  }
};

// DELETE EVENT
const handledEventDeleteController = async (req, res) => {
  try {
    const { Id } = req.body;
    const Eventdeleted = await Event.deleteOne({ _id: Id });
    if (Eventdeleted.acknowledged) {
      return res.status(200).json({ Message: "Data deleted successfully", Success: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err.message, Success: false });
  }
};

// UPDATE EVENT
const handledEventUpdateController = async (req, res) => {
  try {
    const data = req.body;
    const updated = await Event.updateOne({ _id: data.Id }, { $set: data });
    if (updated) {
      return res.status(200).json({ Message: "Data updated successfully", Success: true });
    }
  } catch (err) {
    return res.status(500).json({ Message: err.message, Success: false });
  }
};

module.exports = {
  handledEventController,
  handledEventListController,
  handledEventDeleteController,
  handledEventUpdateController
};



