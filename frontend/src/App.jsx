
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import EventForm from './components/EventForm';
import Home from './components/Home';
import EventList from './components/EventList';
import EventDetails from './pages/EventDetails';
import Auth from './pages/Auth';
import EventRegister from './pages/EventRegister';
import Participants from './pages/Participants';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Create Event" element={<EventForm />} />
        <Route path="/View Event" element={<EventList />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/event-register" element={<EventRegister />} />
        <Route path="/event-participants/:eventName" element={<Participants/>}/>

        

      </Routes>
    </BrowserRouter>

  );
}

export default App;
