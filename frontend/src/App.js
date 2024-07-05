import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import Register from './components/register/register';
import AddTopic from './components/addTopic/addTopic';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addtopic" element={<AddTopic />} />

          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
