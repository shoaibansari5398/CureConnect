import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
	const currency = "$";

	const calculateAge = (dob) => {
		const today = new Date();
		const birthDate = new Date(dob);
		today, birthDate;
		let age = today.getFullYear() - birthDate.getFullYear();
		return age;
	};

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const slotDateFormat = (slotDate) => {
		const datearray = slotDate.split("_");
		return datearray[0] + " " + months[datearray[1] - 1] + " " + datearray[2];
	};

	const value = { calculateAge, slotDateFormat, currency };

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
