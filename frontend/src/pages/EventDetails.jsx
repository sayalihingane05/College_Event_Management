


import { useLocation, useNavigate } from "react-router-dom";
import eventbg from "../assets/eventbg.jpg";

const EventDetails = () => {
  const { state: event } = useLocation();
  const navigate = useNavigate();

  if (!event) {
    return (
      <p className="text-center mt-10 text-red-500">
        No event details found
      </p>
    );
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 relative"
      style={{
        backgroundImage: `url(${eventbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* EVENT CARD */}
      <div
        className="relative max-w-lg w-full bg-white/20 backdrop-blur-xl 
                   border border-white/30 rounded-3xl shadow-2xl p-8 text-white"
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute -top-5 left-4 bg-cyan-600 hover:bg-cyan-500 
                     text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-center text-amber-300 mb-6 tracking-wide">
          {event.Title}
        </h2>

        {/* EVENT INFO */}
        <div className="space-y-3 text-lg font-medium text-white/90">
          <p className="flex items-center gap-2">
            📅 <span>{new Date(event.date).toLocaleDateString("en-GB")}</span>
          </p>
          <p className="flex items-center gap-2">
            ⏰ <span>{event.time}</span>
          </p>
          <p className="flex items-center gap-2">
            📍 <span>{event.location}</span>
          </p>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-6 text-center text-white/90 leading-relaxed">
          {event.Description}
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-8 grid grid-cols-1 gap-4">
          <button
            onClick={() =>
              navigate("/event-register", {
                state: { eventName: event.Title },
              })
            }
            className="w-full py-3 rounded-xl bg-cyan-800 hover:bg-cyan-700
                       text-white font-bold shadow-lg transition transform hover:scale-[1.02]"
          >
            🎟 Register for Event
          </button>

          <button
            onClick={() =>
              navigate(`/event-participants/${event.Title}`)
            }
            className="w-full py-3 rounded-xl bg-cyan-800 hover:bg-cyan-700
                      
                       backdrop-blur transition transform hover:scale-[1.02]"
          >
            👥 View Participants
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
