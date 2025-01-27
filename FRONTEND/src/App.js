// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Views of Front
import LoginForm from './components/LoginForm/LoginForm';
import CreateUserForm from './components/CreateUserForm/CreateUserForm';
import MainPage from './Pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CreatePlaceForm from './components/CreatePlaceForm/CreatePlaceForm';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/create" element={<CreateUserForm />} />
          
          {/* Routes Proctected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/create-place" element={<CreatePlaceForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
