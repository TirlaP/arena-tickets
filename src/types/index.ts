export interface SectionProps {
	id: string;
	type: "standard" | "vip";
	onClick?: (id: string) => void;
	className?: string;
}

export interface ArenaSection {
	id: string;
	type: "standard" | "vip";
	position: "left" | "right" | "bottom";
	className?: string;
}

export interface Seat {
	id: string;
	row: string;
	number: number;
	price: number;
	status: "available" | "unavailable" | "selected";
	sectionId: string;
	sectionType: "standard" | "vip";
}

export interface PurchasedSeat extends Seat {
	purchaseDate: string;
}

export interface OrderSummary {
	seats: Seat[];
	paymentMethod: string;
	totalPrice: number;
	date: string;
}

export interface ModalHistory {
	sectionId: string;
	sectionType: "standard" | "vip";
}

export interface PaymentMethod {
	id: string;
	name: string;
}

export interface SectionStatus {
	availableSeats: number;
	totalSeats: number;
	purchasedSeats: string[];
}
