import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
	const { doctors } = useContext(AppContext);

	return (
		<div>
			<div>
				<p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointmnets</p>
				<div>
					{doctors.slice(0, 4).map((item, index) => (
						<div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={[index]}>
							<div>
								<img className="w-32 bg-indigo-50" src={item.image} alt="doctor" />
							</div>
							<div className="flex-1 text-zinc-600 text-sm">
								<p className="text-neutral-800 font-semibold">{item.name}</p>
								<p>{item.speciaity}</p>
								<p className="text-zinc-700 font-medium mt-1">Address:</p>
								<p className="text-xs">{item.address.line1}</p>
								<p className="text-xs">{item.address.line2}</p>
								<p className="text-xs mt-1">
									<span className="text-sm text-neutral-700 font-medium">Date & Time:</span> 20, September, 2024 | 9:00 PM
								</p>
							</div>
							<div></div>
							<div className="flex flex-col gap-2 justify-end">
								<button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 rounded-md">Pay Online</button>
								<button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 rounded-md">Cancel Booking</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyAppointments;
