import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SimpleLogin from "./components/Auth/SimpleLogin";
import Signup from "./components/Auth/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CabBookingForm from "./components/Booking/CabBookingForm";
import TripHistory from "./components/Trips/TripHistory";
import TripList from "./components/Trips/TripList";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SimpleLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trip-history" element={<TripHistory />} />
          <Route path="/trip-list" element={<TripList />} />

          <Route path="/userdashboard" element={
            <ProtectedRoute>
              <RoleBasedRoute role="USER"><UserDashboard/></RoleBasedRoute>
            </ProtectedRoute>
          } />

          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <RoleBasedRoute role="ADMIN"><AdminDashboard/></RoleBasedRoute>
            </ProtectedRoute>
          } />

          <Route path="/book-cab" element={
            <ProtectedRoute>
              <RoleBasedRoute role="USER"><CabBookingForm/></RoleBasedRoute>
            </ProtectedRoute>
          } />

          <Route path="/trips" element={
            <ProtectedRoute><TripHistory/></ProtectedRoute>
          } />

          <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
