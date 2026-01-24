const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);
