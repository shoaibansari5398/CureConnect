import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);

	const { token, setToken,userData } = useContext(AppContext);

	const logoutHandler = () => {
		setToken(false);
		localStorage.removeItem("token");
	};

	return (
		<div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400">
			<p
				onClick={() => navigate("/")}
				className="text-2xl font-bold cursor-pointer"
			>
				CureConnect
			</p>
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
				<NavLink
					to={import.meta.env.VITE_ADMIN_URL || "/http://localhost:5174/"}
				>
					<li className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs font-bold">
						Admin
					</li>
				</NavLink>
			</ul>
			<div className="flex items-center gap-4">
				{token && userData ? (
					<div className="flex items-center gap-2 cursor-pointer group relative">
						<img
							className="w-8 rounded-full"
							src={userData.image}
							alt="profile-pic"
						></img>
						<img
							className="w-2.5"
							src={assets.dropdown_icon}
							alt="dropdown-icon"
						></img>
						<div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-500 z-2 hidden group-hover:block">
							<div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
								<p
									onClick={() => navigate("/my-appointments")}
									className="cursor-pointer hover:text-black"
								>
									My Appointments
								</p>
								<p
									onClick={() => navigate("/my-profile")}
									className="cursor-pointer hover:text-black"
								>
									My Profile
								</p>
								<p
									onClick={logoutHandler}
									className="cursor-pointer hover:text-black"
								>
									Logout
								</p>
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
				<img
					className="w-6 md:hidden cursor-pointer"
					src={assets.menu_icon}
					alt="menu_icon"
					onClick={() => setShowMenu(true)}
				/>
				<div
					className={`${
						showMenu ? "w-full fixed" : "h-0 w-0"
					} w-6 md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
				>
					<div className="flex items-center justify-between px-5 py-6">
						<p className="w-36">CureConnect</p>
						<img
							className="w-7 cursor-pointer"
							src={assets.cross_icon}
							alt=""
						/>
					</div>
					<ul className="flex flex-col gap-2 items-center mt-5 px-5 text-lg font-medium">
						<NavLink onClick={() => setShowMenu(false)} to="/">
							HOME
						</NavLink>
						<NavLink onClick={() => setShowMenu(false)} to="/doctors">
							ALL DOCTORS
						</NavLink>
						<NavLink onClick={() => setShowMenu(false)} to="/about">
							ABOUT
						</NavLink>
						<NavLink onClick={() => setShowMenu(false)} to="/contact">
							CONTACT
						</NavLink>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
