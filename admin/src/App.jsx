import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./compenents/Navbar";
import Sidebar from "./compenents/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import DoctorsList from "./pages/Admin/DoctorsList";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
	const { aToken } = useContext(AdminContext);
	const { dToken } = useContext(DoctorContext);
	return aToken || dToken ? (
		<div>
			<ToastContainer />
			<Navbar />
			<div className="flex flex-start bg-gray-100">
				<Sidebar />
				<Routes>

					{/* Admin Route */}
					<Route path="/" element={<></>} />
					<Route path="/admin-dashboard" element={<Dashboard />} />
					<Route path="/doctor-list" element={<DoctorsList />} />
					<Route path="/all-appointments" element={<AllAppointments />} />
					<Route path="/add-doctor" element={<AddDoctor />} />

					{/* Doctor Route */}
					<Route path="/doctor-dashboard" element={<DoctorDashboard />} />
					<Route path="/doctor-appointments" element={<DoctorAppointments />} />
					<Route path="/doctor-profile" element={<DoctorProfile />} />
				</Routes>

			</div>
		</div>
	) : (
		<div>
			<Login />
			<ToastContainer />
		</div>
	);
};

export default App;
