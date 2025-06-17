import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
	const { backendUrl, token, getDoctorsData } = useContext(AppContext);
	const [appointments, setAppointments] = useState([]);
	const [paid, setPaid] = useState(false);

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const slotDateFormat = (slotDate) => {
		const datearray = slotDate.split("_");
		return datearray[0] + " " + months[datearray[1] - 1] + " " + datearray[2];
	};

	const getUserAppointments = async () => {
		try {
			const { data } = await axios.get(
				`${backendUrl}/api/user/my-appointments`,
				{
					headers: { token },
				}
			);
			setAppointments(data.appointments);
		} catch (error) {
			error;
			toast.error(error.message);
		}
	};

	const cancelAppointment = async (appointmentId) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/user/cancel-appointment`,
				{
					appointmentId,
				},
				{
					headers: { token },
				}
			);

			if (data.success) {
				toast.success(data.message);
				getUserAppointments();
				getDoctorsData();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			error;
			toast.error(error.message);
		}
	};

	const payOnline = async (appointmentId) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/user/pay-online`,
				{
					appointmentId,
				},
				{
					headers: { token },
				}
			);

			if (data.success) {
				toast.success(data.message);
				setPaid(true);
				getUserAppointments();
				getDoctorsData();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			error;
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (token) {
			getUserAppointments();
		}
	}, [token]);

	return (
		<div>
			<div>
				<p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
					My Appointmnets
				</p>
				<div>
					{appointments.map((item, index) => (
						<div
							className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
							key={[index]}
						>
							<div>
								<img
									className="w-32 bg-indigo-50"
									src={item.docData.image}
									alt="doctor"
								/>
							</div>
							<div className="flex-1 text-zinc-600 text-sm">
								<p className="text-neutral-800 font-semibold">
									{item.docData.name}
								</p>
								<p>{item.docData.speciality}</p>
								<p className="text-zinc-700 font-medium mt-1">Address:</p>
								<p className="text-xs">{item.docData.addressline1}</p>
								<p className="text-xs">{item.docData.addressline2}</p>
								<p className="text-xs mt-1">
									<span className="text-sm text-neutral-700 font-medium">
										Date & Time:
									</span>{" "}
									{slotDateFormat(item.slotDate)} | {item.slotTime}
								</p>
							</div>
							<div></div>
							<div className="flex flex-col gap-2 justify-end">
								{!item.cancelled && item.payment && !item.isCompleted && (
									<button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
										Paid
									</button>
								)}

								{!item.cancelled && !item.payment && !item.isCompleted && (
									<button
										onClick={() => payOnline(item._id)}
										className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 rounded-md"
									>
										Pay Online
									</button>
								)}

								{!item.cancelled && !item.isCompleted && (
									<button
										onClick={() => cancelAppointment(item._id)}
										className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 rounded-md"
									>
										Cancel Booking
									</button>
								)}
								{item.cancelled && !item.isCompleted && (
									<button className="sm:min-w-48 py-2 border border-red-500 text-red-500 rounded">
										Cancelled Appointment
									</button>
								)}
								{item.isCompleted && (
									<button className="sm:min-w-48 py-2 border border-green-500 text-green-500 rounded">
										Completed Appointment
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyAppointments;
