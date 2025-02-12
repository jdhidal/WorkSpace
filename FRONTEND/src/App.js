import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Views of Front
import LoginForm from './components/LoginForm/LoginForm';
import Header from './components/Header/Header';
import CreateUserForm from './components/CreateUserForm/CreateUserForm';
import MainPage from './Pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CreatePlaceForm from './components/CreatePlaceForm/CreatePlaceForm';
import AvailabilityForm from './components/AvailabilityForm/AvailabilityForm';
import CreateAvailabilityForm from './components/CreateAvailabilityForm/CreateAvailabilityForm';
import CreateRoleForm from './components/CreateRoleForm/CreateRoleForm';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/create" element={<CreateUserForm />} />
          
          {/* Routes Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/header" element={<Header />} />
            <Route path="/create-place" element={<CreatePlaceForm />} />
            <Route path="/availability-form" element={<AvailabilityForm />} />
            <Route path="/crear-disponibilidad" element={<CreateAvailabilityForm />} />
            <Route path="/create-role" element={<CreateRoleForm />} />
          </Route>
        </Routes>

        {/* ToastContainer for notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick 
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;