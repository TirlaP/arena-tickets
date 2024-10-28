import { Seat } from "../types/seats";

export const generateMockSeats = (sectionId: string): Seat[] => {
	const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
	const seatsPerRow = 22;
	const seats: Seat[] = [];
	const basePrice = Math.floor(Math.random() * 300) + 200;

	rows.forEach((row) => {
		for (let number = 1; number <= seatsPerRow; number++) {
			// Create some random unavailable seats
			const status = Math.random() > 0.8 ? "unavailable" : "available";

			seats.push({
				id: `${sectionId}-${row}-${number}`,
				row,
				number,
				price: basePrice,
				status,
			});
		}
	});

	return seats;
};

// Initialize seats in localStorage if not present
export const initializeSeatsData = () => {
	if (!localStorage.getItem("seatsData")) {
		const seatsData: { [key: string]: Seat[] } = {};

		// Generate for standard sections
		for (let i = 201; i <= 213; i++) {
			seatsData[i.toString()] = generateMockSeats(i.toString());
		}

		// Generate for VIP sections
		for (let i = 1; i <= 14; i++) {
			seatsData[`VIP${i}`] = generateMockSeats(`VIP${i}`);
		}

		localStorage.setItem("seatsData", JSON.stringify(seatsData));
	}
};
