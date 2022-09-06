import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminPanel from './pages/AdminPanel';
import NoPage from './pages/NoPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='nav'>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registraion</Link>
          <Link to="/userapp">Users</Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/userapp" element={<AdminPanel/>}/>
         <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
