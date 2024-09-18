import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
	const { id } = useParams();
	const { doctors, currencySymbol } = useContext(AppContext);

	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const [docInfo, setDocInfo] = useState(null);
	const [docSlots, setDocSlots] = useState([]);
	const [slotIndex, setSlotIndex] = useState(0);
	const [slotTime, setSlotTime] = useState("");

	const fetchDocInfo = async () => {
		const docInfo = doctors.find((doc) => doc._id === id);
		setDocInfo(docInfo);
	};

	const getAvailableSlots = async () => {
		const today = new Date();
		setDocSlots([]);

		for (let i = 0; i < 7; i++) {
			const currentDate = new Date(today);
			currentDate.setDate(today.getDate() + i);

			const endTime = new Date();
			endTime.setDate(today.getDate() + i);
			endTime.setHours(21, 0, 0, 0);

			if (today.getDate() === currentDate.getDate()) {
			// if (i===0) {
				currentDate.setHours(
					currentDate.getHours() > 10 ? currentDate.setHours() + 1 : 10
				);
				currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
			} else {
				currentDate.setHours(10);
				currentDate.setMinutes(0);
			}

			let timeSlots = [];

			while (currentDate < endTime) {
				const formattedTime = currentDate.toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				});
				timeSlots.push({
					datetime: new Date(currentDate),
					time: formattedTime,
				});
				currentDate.setMinutes(currentDate.getMinutes() + 30);
			}

			// setDocSlots((prevSlots) => [...prevSlots, timeSlots]);
			if (timeSlots.length > 0) {
				setDocSlots((prevSlots) => [...prevSlots, timeSlots]);
			}
		}
	};

	useEffect(() => {
		fetchDocInfo();
	}, [doctors, id]);

	useEffect(() => {
		getAvailableSlots();
	}, [docInfo]);

	useEffect(() => {
		console.log(docSlots);
	}, [docSlots]);

	return (
		docInfo && (
			<div>
				<div className="flex flex-col sm:flex-row gap-4">
					<div>
						<img
							className="w-full sm:max-w-72 bg-primary rounded-lg"
							src={docInfo.image}
							alt={docInfo.name}
						/>
					</div>
					<div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
						<p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
							{docInfo.name}
							<img className="w-5" src={assets.verified_icon}></img>
						</p>
						<div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
							<p>
								{docInfo.degree} - {docInfo.speciality}
							</p>
							<button className="py-0.5 px-2 border text-xs rounded-full">
								{docInfo.experience}
							</button>
						</div>
						<div>
							<p className="flex items-center gap-1 text-sm mt-3 text-gray-900 font-medium">
								About <img src={assets.info_icon}></img>
							</p>
							<p className="text-sm text-gray-500 max-w-[700px] mt-1">
								{docInfo.about}
							</p>
						</div>
						<p className="text-gray-500 text-medium mt-4">
							Appointment Fee:{" "}
							<span className="text-gray-600">
								{currencySymbol} {docInfo.fees}
							</span>
						</p>
					</div>
				</div>
				<div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
					<p className="">Booking Slots</p>
					<div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
						{docSlots.length > 0 &&
							docSlots.map((daySlots, index) => (
								<div
									onClick={() => setSlotIndex(index)}
									key={index}
									className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
										slotIndex === index
											? "bg-primary text-white"
											: "border border-gray-200"
									}`}
								>
									<p>
										{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
									</p>
									<p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
								</div>
							))}
					</div>
					<div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
						{docSlots.length &&
							docSlots[slotIndex].map((slot, index) => (
								<p
									onClick={() => setSlotTime(slot.time)}
									className={`text-sm font-light flexshrink-0 px-5 py-2 rounded-full cursor-pointer ${
										slot.time === slotTime
											? "bg-primary text-white"
											: "border border-gray-200 text-gray-400"
									}`}
								>
									{slot.time.toLowerCase()}
								</p>
							))}
					</div>
					<button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
						Book Appointment
					</button>
				</div>
			</div>
		)
	);
};

export default Appointment;
