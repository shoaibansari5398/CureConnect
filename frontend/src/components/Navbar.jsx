import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
const Navbar = () => {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const [token, setToken] = useState(true);

	return (
		<div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400">
			<p onClick={() => navigate("/")} className="text-2xl font-bold cursor-pointer">CureConnect</p>
			<ul className="hidden md:flex gap-5 items-center font-medium">
				<NavLink to="/">
					<li className="py-1">Home</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/doctors">
					<li className="py-1">Doctors</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/about">
					<li className="py-1">About</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/contact">
					<li className="py-1">Contact</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
			</ul>
			<div className="flex items-center gap-4">
				{token ? (
					<div className="flex items-center gap-2 cursor-pointer group relative">
						<img
							className="w-8 rounded-full"
							src={assets.profile_pic}
							alt="profile-pic"
						></img>
						<img
							className="w-2.5"
							src={assets.dropdown_icon}
							alt="dropdown-icon"
						></img>
						<div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-500 z-2 hidden group-hover:block">
							<div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
								<p onClick={() => navigate("/my-appointments")} className="cursor-pointer hover:text-black">My Appointments</p>
								<p onClick={() => navigate("/my-profile")} className="cursor-pointer hover:text-black">My Profile</p>
								<p onClick={() => setToken(false)} className="cursor-pointer hover:text-black">Logout</p>
							</div>
						</div>
					</div>
				) : (
					<button
						onClick={() => navigate("/login")}
						className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
					>
						Create Account
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
