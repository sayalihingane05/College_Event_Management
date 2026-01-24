import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Import background image from assets
import eventFormBg from "../assets/eventformbg.jpg";

const API = "http://localhost:5000/event";

const EventForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Title: "",
    date: "",
    time: "",
    location: "",
    Description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/addEvent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.Message);

    setForm({
      Title: "",
      date: "",
      time: "",
      location: "",
      Description: ""
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url(${eventFormBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white w-full max-w-md p-7 rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          🎓 Create Event
        </h2>

        {/* Title */}
        <input
          name="Title"
          placeholder="Event Title"
          value={form.Title}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        />

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
        </div>

        {/* Location */}
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        />

        {/* Description */}
        <textarea
          name="Description"
          placeholder="Short description"
          value={form.Description}
          onChange={handleChange}
          rows="3"
          className="w-full mb-5 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 
                     text-white py-2 rounded-lg font-semibold transition"
        >
          Add Event
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 w-full bg-cyan-700 hover:bg-cyan-800 
                     text-white py-2 rounded-lg font-semibold transition"
        >
          ← Back
        </button>
      </form>
    </div>
  );
};

export default EventForm;
