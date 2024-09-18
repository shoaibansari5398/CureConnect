import React from 'react'
import { AppContext } from '../context/AppContext'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ id, speciality }) => {

	const {doctors} = useContext(AppContext)

	const [relatedDoctors, setRelatedDoctors] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		const related = doctors.filter(doctor => doctor.speciality === speciality && doctor._id !== id)
		setRelatedDoctors(related)
	}, [doctors, speciality,id])

  return (
		<div className="flex flex-col gap-4 items-center my-16 text-gray-900 md:mx-10">
			<h1 className="text-3xl font-medium">Top Doctors to Book</h1>
			<p className="sm:w-1/3 text-center text-sm">
				Simplify browse through our extensive list of trusted doctors
			</p>
			<div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
				{relatedDoctors.slice(0, 5).map((doctor, index) => (
					<div
						onClick={() => { navigate(`/appointment/${doctor._id}`);  scrollTo(0,0)}}
						className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
						key={index}
					>
						<img src={doctor.image} alt="doctor1" className="bg-blue-50" />
						<div className="p-4">
							<div className="flex items-center gap-2 text-sm text-center text-green-500">
								<p className="h-2 w-2 rounded-full bg-green-500"></p>
								<p>Available</p>
							</div>
							<p className="text-gray-900 font-medium text-lg">{doctor.name}</p>
							<p className="text-gray-600 text-sm">{doctor.speciality}</p>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={() => navigate("/doctors")}
				className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
			>
				View More
			</button>
		</div>
	);
}

export default RelatedDoctors
