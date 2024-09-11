import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Appointment from "./pages/Appointment";

const App = () => {
	return (
		<div className="mx-4 sm:mx-[10%]">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/doctors" element={<Doctors />} />
				<Route path="/doctors/:speciality" element={<Doctors />} />
				<Route path="/login" element={<Login />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/my-appointments" element={<MyAppointments />} />
				<Route path="/my-profile" element={<MyProfile />} />
				<Route path="/appointment/:id" element={<Appointment />} />
			</Routes>
		</div>
	);
};

export default App;
