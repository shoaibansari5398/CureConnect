import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
	const [aToken, setAToken] = useState(
		localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
	);
	const [appointments, setAppointments] = useState([]);
	const [doctors, setDoctors] = useState([]);
	const [dashData, setDashData] = useState(false);

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const getAllDoctors = async () => {
		aToken;
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/admin/all-doctors`,
				{},
				{
					headers: { aToken },
				}
			);
			if (data.success) {
				setDoctors(data.doctors)(data.doctors);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const changeAvailability = async (docId) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/admin/change-availability`,
				{ docId },
				{
					headers: { aToken },
				}
			);
			if (data.success) {
				toast.success(data.message);
				getAllDoctors();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const getAllAppointments = async () => {
		try {
			const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
				headers: { aToken },
			});
			if (data.success) {
				toast.success(data.message);
				setAppointments(data.appointments);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const cancelAppointment = async (appointmentId) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/admin/cancel-appointment`,
				{ appointmentId },
				{
					headers: { aToken },
				}
			);
			if (data.success) {
				toast.success(data.message);
				getAllAppointments();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const getDashData = async () => {
		try {
			const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
				headers: { aToken },
			});
			if (data.success) {
				toast.success(data.message);
				setDashData(data.dashData);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	const value = {
		aToken,
		setAToken,
		backendUrl,
		getAllDoctors,
		doctors,
		changeAvailability,
		getAllAppointments,
		appointments,
		setAppointments,
		cancelAppointment,
		getDashData,
		dashData,
	};

	return (
		<AdminContext.Provider value={value}>{children}</AdminContext.Provider>
	);
};

export default AdminContextProvider;
