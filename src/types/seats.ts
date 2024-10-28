export interface Seat {
	id: string;
	row: string;
	number: number;
	price: number;
	status: "available" | "unavailable" | "selected";
}

export interface SectionData {
	id: string;
	type: "standard" | "vip";
	rows: string[];
	seatsPerRow: number;
	prices: {
		[key: string]: number;
	};
}
