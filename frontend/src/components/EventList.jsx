 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://your-backend.onrender.com/event";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null); 
  const navigate=useNavigate();

  const getEvents = async () => {
    const res = await fetch(`${API}/Eventlist`);
    const data = await res.json();

    if (data.EventList) {
      setEvents(data.EventList);
    } else {
      setEvents([]);
      console.error("Error fetching events:", data.Message);
    }
  };


    // delete logic 
  const deleteEvent = async (id) => {
    await fetch(`${API}/deleteEvent`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Id: id })
    });
    getEvents();
  };

  //  UPDATE LOGIC
  const updateEvent = async () => {
    await fetch(`${API}/updateEvent`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editEvent,
        Id: editEvent._id
      })
    });

    setEditEvent(null);
    getEvents();
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-300 py-10 px-4 relative">

  {/* Back Button – Top Right */}
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-500 
               text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
  >
    ← Back
  </button>


      <h2 className="text-3xl font-bold text-center mb-10 text-cyan-700">
        📅 Event List
      </h2>

      {/* update event form */}
      {editEvent && (
        <div className="max-w-md mx-auto  bg-white p-5 rounded shadow mb-10">
          <h3 className="text-xl font-bold mb-4 text-blue-700">
            Update Event
          </h3>

          <input
            className="w-full border p-2 mb-2"
            value={editEvent.Title}
            onChange={(e) =>
              setEditEvent({ ...editEvent, Title: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full border p-2 mb-2"
            value={editEvent.date.split("T")[0]}
            onChange={(e) =>
              setEditEvent({ ...editEvent, date: e.target.value })
            }
          />

          <input
            type="time"
            className="w-full border p-2 mb-2"
            value={editEvent.time}
            onChange={(e) =>
              setEditEvent({ ...editEvent, time: e.target.value })
            }
          />

          <input
            className="w-full border p-2 mb-2"
            value={editEvent.location}
            onChange={(e) =>
              setEditEvent({ ...editEvent, location: e.target.value })
            }
          />

          <textarea
            className="w-full border p-2 mb-3"
            value={editEvent.Description}
            onChange={(e) =>
              setEditEvent({ ...editEvent, Description: e.target.value })
            }
          />

          <div className="flex gap-2">
            <button
              onClick={updateEvent}
              className="flex-1 bg-green-600 text-white py-2 rounded"
            >
              Update
            </button>

            <button
              onClick={() => setEditEvent(null)}
              className="flex-1 bg-gray-400 text-white py-2 rounded"
            >
              Cancel
            </button>

            
          </div>
        </div>
      )}

      {/* EVENT LIST */}
      {events.length === 0 ? (
        <p className="text-center font-bold text-red-500">
          No events available
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-5 border-t-4 border-blue-900"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {event.Title}
              </h3>

              <div className="text-sm text-gray-700 mb-4">
                📍 {event.location}
              </div>



              <div className="text-sm text-gray-700 mb-1">
                📆 {new Date(event.date).toLocaleDateString("en-GB")}
              </div>

              <div className="text-sm text-gray-700 mb-1">
                ⏰ {event.time}
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {event.Description}
              </p>



              <div className="flex gap-3 mt-3">
  <button
    onClick={() => deleteEvent(event._id)}
    className="flex-1 bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg text-sm font-semibold transition"
  >
    Delete
  </button>

  <button
    onClick={() => setEditEvent(event)}
    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition"
  >
    Update
  </button>

  
</div>


            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;