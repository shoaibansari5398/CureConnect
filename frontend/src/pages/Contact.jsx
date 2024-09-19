import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
	return (
		<div>
			<div className="text-2xl  text-center pt-10 text-gray-600">
				<p>
					Contact <span className="text-gray-700 font-semibold">US</span>
				</p>
			</div>
			<div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
				<img className="w-full md:max-w-[360px] " src={assets.contact_image} alt="" />
				<div className="flex flex-col items-start gap-6 justify-center">
					<p className="text-lg font-semibold text-gray-600">OUR OFFICE</p>
					<p className="text-gray-500">Mumbai Maharashtra</p>
					<p className="text-gray-500">Tel: 1234567890</p>
					<p className="text-lg font-semibold text-gray-600">Carrer at CureConnect</p>
					<p className="text-gray-500">Learn more about our team and job openings.</p>
					<button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white duration-500 transition-all ">Explore More</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
