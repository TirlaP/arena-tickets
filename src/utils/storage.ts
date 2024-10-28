import { Seat, SectionStatus } from "../types";
import { SECTION_CONFIGS } from "./seatingConfig";

export const STORAGE_KEYS = {
	PURCHASED_SEATS: "purchasedSeats",
	SECTION_STATUSES: "sectionStatuses",
} as const;

export const getPurchasedSeats = (sectionId: string): string[] => {
	const stored = localStorage.getItem(STORAGE_KEYS.PURCHASED_SEATS);
	if (!stored) return [];
	try {
		const purchasedSeatsMap = JSON.parse(stored);
		return purchasedSeatsMap[sectionId] || [];
	} catch {
		return [];
	}
};

export const storePurchasedSeats = (seats: Seat[]) => {
	const stored = localStorage.getItem(STORAGE_KEYS.PURCHASED_SEATS) || "{}";
	const purchasedSeatsMap = JSON.parse(stored);

	seats.forEach((seat) => {
		if (!purchasedSeatsMap[seat.sectionId]) {
			purchasedSeatsMap[seat.sectionId] = [];
		}
		if (!purchasedSeatsMap[seat.sectionId].includes(seat.id)) {
			purchasedSeatsMap[seat.sectionId].push(seat.id);
		}
	});

	localStorage.setItem(
		STORAGE_KEYS.PURCHASED_SEATS,
		JSON.stringify(purchasedSeatsMap)
	);
	updateSectionStatuses(seats);
	return purchasedSeatsMap;
};

export const getSectionStatus = (
	sectionId: string,
	sectionType: "standard" | "vip"
): SectionStatus => {
	const config = SECTION_CONFIGS[sectionType].dimensions;
	const totalSeats = config.rows.length * config.seatsPerRow;
	const purchasedSeats = getPurchasedSeats(sectionId);

	return {
		availableSeats: totalSeats - purchasedSeats.length,
		totalSeats,
		purchasedSeats,
	};
};

const updateSectionStatuses = (purchasedSeats: Seat[]) => {
	const stored = localStorage.getItem(STORAGE_KEYS.SECTION_STATUSES) || "{}";
	const statusMap = JSON.parse(stored);

	const sectionGroups = purchasedSeats.reduce((acc, seat) => {
		if (!acc[seat.sectionId]) {
			acc[seat.sectionId] = {
				type: seat.sectionType,
				seats: [],
			};
		}
		acc[seat.sectionId].seats.push(seat);
		return acc;
	}, {} as Record<string, { type: "standard" | "vip"; seats: Seat[] }>);

	Object.entries(sectionGroups).forEach(([sectionId, group]) => {
		const status = getSectionStatus(sectionId, group.type);
		statusMap[sectionId] = status;
	});

	localStorage.setItem(
		STORAGE_KEYS.SECTION_STATUSES,
		JSON.stringify(statusMap)
	);
};

export const isSectionAvailable = (
	sectionId: string,
	sectionType: "standard" | "vip"
): boolean => {
	const status = getSectionStatus(sectionId, sectionType);
	return status.availableSeats > 0;
};

export const clearStorage = () => {
	localStorage.removeItem(STORAGE_KEYS.PURCHASED_SEATS);
	localStorage.removeItem(STORAGE_KEYS.SECTION_STATUSES);
};
