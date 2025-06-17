import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Doctors = () => {
	const { speciality } = useParams();
	const navigate = useNavigate();
	const [filterDoc, setFilterDoc] = useState([]);
	const [showMenu, setShowMenu] = useState(false);

	speciality;

	const { doctors } = useContext(AppContext);

	const applyFilter = () => {
		if (speciality) {
			setFilterDoc(
				doctors.filter((doctor) => doctor.speciality === speciality)
			);
		} else {
			setFilterDoc(doctors);
		}
	};

	useEffect(() => {
		applyFilter();
	}, [doctors, speciality]);

	return (
		<div>
			<p className="text-gray-600">Browse through doctors speciality</p>
			<div className="flex flex-col md:flex-row items-start gap-5 mt-5">
				<button
					className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
						showMenu ? "bg-[#5F6FFF] text-white" : ""
					}`}
					onClick={() => setShowMenu(!showMenu)}
				>
					Filters
				</button>
				<div
					className={`flex flex-col gap-4 text-sm text-gray-600 ${
						showMenu ? "flex" : "hidden sm:flex"
					}`}
				>
					<p
						onClick={() =>
							speciality === "General Physician"
								? navigate("/doctors")
								: navigate(`/doctors/General Physician`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "General Physician"
								? "bg-indigo-100 text-black"
								: ""
						}`}
					>
						General Physician
					</p>
					<p
						onClick={() =>
							speciality === "Gynaecologist"
								? navigate("/doctors")
								: navigate(`/doctors/Gynecologist`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
						}`}
					>
						Gynecologist
					</p>
					<p
						onClick={() =>
							speciality === "Dermatologist"
								? navigate("/doctors")
								: navigate(`/doctors/Dermatologist`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
						}`}
					>
						Dermatologist
					</p>
					<p
						onClick={() =>
							speciality === "Pediatrician"
								? navigate("/doctors")
								: navigate(`/doctors/Pediatrician`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""
						}`}
					>
						Pediatrician
					</p>
					<p
						onClick={() =>
							speciality === "Neurologist"
								? navigate("/doctors")
								: navigate(`/doctors/Neurologist`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
						}`}
					>
						Neurologist
					</p>
					<p
						onClick={() =>
							speciality === "Gastroenterologist"
								? navigate("/doctors")
								: navigate(`/doctors/Gastroenterologist`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "Gastroenterologist"
								? "bg-indigo-100 text-black"
								: ""
						}`}
					>
						Gastroenterologist
					</p>
				</div>
				<div className="w-full grid grid-cols-auto gap-4 gap-y-6">
					{filterDoc.map((doctor, index) => (
						<div
							onClick={() => navigate(`/appointment/${doctor._id}`)}
							className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
							key={index}
						>
							<img src={doctor.image} alt="doctor1" className="bg-blue-50" />
							<div className="p-4">
								<div
									className={`flex items-center gap-2 text-sm text-center ${
										doctor.available ? "text-green-500" : "text-red-500"
									}`}
								>
									<p
										className={`h-2 w-2 rounded-full ${
											doctor.available ? "bg-green-500" : "bg-red-500"
										}`}
									></p>
									<p>{doctor.available ? "Available" : "Not Available"}</p>
								</div>
								<p className="text-gray-900 font-medium text-lg">
									{doctor.name}
								</p>
								<p className="text-gray-600 text-sm">{doctor.speciality}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Doctors;
