import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Doctors = () => {
	const { speciality } = useParams();
	const navigate = useNavigate();
	const [filterDoc, setFilterDoc] = useState([]);

	console.log(speciality);

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
				<div className="flex flex-col gap-4 text-sm text-gray-600">
					<p
						onClick={() =>
							speciality === "General physician"
								? navigate("/doctors")
								: navigate(`/doctors/General physician`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "General physician"
								? "bg-indigo-100 text-black"
								: ""
						}`}
					>
						General physician
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
								: navigate(`/doctors/Pediatricians`)
						}
						className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
							speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
						}`}
					>
						Pediatricians
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
								<div className="flex items-center gap-2 text-sm text-center text-green-500">
									<p className="h-2 w-2 rounded-full bg-green-500"></p>
									<p>Available</p>
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
