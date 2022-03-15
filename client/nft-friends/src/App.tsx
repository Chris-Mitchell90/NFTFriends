import React from 'react';
import { Login } from './Components/Login';
import { Dashboard } from './Components/Dashboard';
import { EventPage } from './Components/EventPage';
import { Form } from './Components/Form';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import './App.css';

export const App: React.FC = () => {
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

