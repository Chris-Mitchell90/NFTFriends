import './App.css';
import Login from './Components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';
import EventPage from './Components/EventPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/eventPage" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
