import React from "react";

const Footer = () => {
	return (
		<div className="md:mx-10">
			<div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
				<div>
					<h3 className="text-xl font-semibold mb-5">CureConnect</h3>
					<p className="w-full md:w-2/3 text-gray-500 leading-6">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
						laborum officia assumenda rerum quis ratione, harum eaque enim
						delectus voluptatum, laboriosam exercitationem ducimus perferendis
						placeat, dolorem pariatur quas dolores illo.
					</p>
				</div>
				<div className="">
					<p className="text-xl mb-5 font-medium">COMPANY</p>
					<ul className="flex flex-col gap-2 text-gray-600">
						<li>Home</li>
						<li>About US</li>
						<li>Contact Us</li>
						<li>Terms of Use</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
				<div>
					<p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
					<ul className="flex flex-col gap-2 text-gray-600">
						<li>+911234567890</li>
						<li>info@cureconnect.com</li>
					</ul>
				</div>
			</div>
			<div>
				<hr></hr>
				<p className="py-5 text-sm text-center">
					© 2024 CureConnect. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
