import React from "react";
import { assets } from "../assets/assets";

const About = () => {
	return (
		<div>
			<div className="text-center text-2xl pt-10 text-gray-500">
				<p>
					ABOUT
					<span className="text-gray-700 font-medium"> US</span>
				</p>
			</div>
			<div className="my-10 flex flex-col md:flex-row gap-12">
				<img
					className="w-full md:max-w-[360px]"
					src={assets.about_image}
					alt="about"
				/>
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
						perferendis reiciendis quos culpa enim ipsa harum ab repellat magni
						cupiditate facere est quam libero molestiae praesentium iste,
						distinctio dolorum sint!
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
						perferendis reiciendis quos culpa enim ipsa harum ab repellat magni
						cupiditate facere est quam libero molestiae praesentium iste,
						distinctio dolorum sint!
					</p>
					<b className="text-gray-600">Our Vision</b>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
						perferendis reiciendis quos culpa enim ipsa harum ab repellat magni
						cupiditate facere est quam libero molestiae praesentium iste,
						distinctio dolorum sint!
					</p>
				</div>
			</div>
			<div className="text-xl my-4">
				<p>
					WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
				</p>
			</div>
			<div className="flex flex-col md:flex-row mb-29">
				<div className="border px-10 md:px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white rounded-md transition-all duration-300 text-gray-600 cursor-pointer">
					<b>Efficiency:</b>
					<p>
						Streamlined appointment scheduling that fits into your busy
						lifestyle.
					</p>
				</div>
				<div className="border px-10 md:px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white rounded-md transition-all duration-300 text-gray-600 cursor-pointer">
					<b>Convenience:</b>
					<p>Book appointments effortlessly from anywhere, anytime.</p>
				</div>
				<div className="border px-10 md:px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white rounded-md transition-all duration-300 text-gray-600 cursor-pointer">
					<b>Personalization:</b>
					<p>Tailored experiences based on your preferences and needs.</p>
				</div>
			</div>
		</div>
	);
};

export default About;
