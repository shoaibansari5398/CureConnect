import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
	return (
		<div id="speciality" className="py-16 flex flex-col gap-4">
			<h1 className="text-2xl md:text-3xl text-center ">Find by Speciality</h1>
			<p className="text-center text-sm md:text-base">
				Simply browse through our extensive list of trusted doctors,
				<br />
				schedule your appointment hassle-free.
			</p>
			<div className="flex flex-wrap justify-center gap-4 mt-8">
				{specialityData.map((item, index) => (
					<Link
						onClick={() => scrollTo(0, 0)}
						to={`/doctors/${item.speciality}`}
						key={index}
						className="bg-white rounded-lg shadow-md p-4 w-48 h-48 flex flex-col items-center justify-center hover:translate-y-[-10px] transition-all duration-500"
					>
						<img src={item.image} alt={item.speciality} className="w-16 h-16" />
						<h2 className="text-lg font-semibold text-center mt-4">
							{item.speciality}
						</h2>
					</Link>
				))}
			</div>
		</div>
	);
};

export default SpecialityMenu;
