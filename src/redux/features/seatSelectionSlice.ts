import { ModalHistory, PurchasedSeat, Seat } from "@/types";
import { STORAGE_KEYS } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SeatSelectionState {
	selectedSeats: Seat[];
	modalHistory: ModalHistory[];
	purchasedSeats: PurchasedSeat[];
}

const loadStoredData = () => {
	if (typeof window === "undefined") {
		return {
			selectedSeats: [],
			modalHistory: [],
			purchasedSeats: [],
		};
	}

	const storedPurchased = localStorage.getItem(STORAGE_KEYS.PURCHASED_SEATS);
	const storedSelected = localStorage.getItem("selectedSeats");
	const storedHistory = localStorage.getItem("modalHistory");

	let purchasedSeats: PurchasedSeat[] = [];

	if (storedPurchased) {
		try {
			const parsedPurchased = JSON.parse(storedPurchased) as Record<
				string,
				string[]
			>;
			Object.entries(parsedPurchased).forEach(([sectionId, seatIds]) => {
				if (Array.isArray(seatIds)) {
					seatIds.forEach((seatId) => {
						const parts = seatId.split("-");
						if (parts.length >= 3) {
							const [, row, numberStr] = parts;
							purchasedSeats.push({
								id: seatId,
								row,
								number: parseInt(numberStr, 10),
								price: 0,
								status: "unavailable" as const,
								sectionId,
								sectionType:
									sectionId.length <= 2 ? "vip" : ("standard" as const),
								purchaseDate: new Date().toISOString(),
							});
						}
					});
				}
			});
		} catch (error) {
			console.error("Error parsing purchased seats:", error);
		}
	}

	return {
		selectedSeats: storedSelected ? JSON.parse(storedSelected) : [],
		modalHistory: storedHistory ? JSON.parse(storedHistory) : [],
		purchasedSeats,
	};
};

const initialState: SeatSelectionState = loadStoredData();

const seatSelectionSlice = createSlice({
	name: "seatSelection",
	initialState,
	reducers: {
		addSeat: (state, action: PayloadAction<Seat>) => {
			const isPurchased = state.purchasedSeats.some(
				(seat) => seat.id === action.payload.id
			);
			if (!isPurchased) {
				state.selectedSeats.push({ ...action.payload, status: "selected" });
				localStorage.setItem(
					"selectedSeats",
					JSON.stringify(state.selectedSeats)
				);
			}
		},
		removeSeat: (state, action: PayloadAction<string>) => {
			state.selectedSeats = state.selectedSeats.filter(
				(seat) => seat.id !== action.payload
			);
			localStorage.setItem(
				"selectedSeats",
				JSON.stringify(state.selectedSeats)
			);
		},
		clearSeats: (state) => {
			state.selectedSeats = [];
			localStorage.removeItem("selectedSeats");
		},
		addToHistory: (state, action: PayloadAction<ModalHistory>) => {
			const filtered = state.modalHistory.filter(
				(item) => item.sectionId !== action.payload.sectionId
			);
			state.modalHistory = [...filtered, action.payload];
			localStorage.setItem("modalHistory", JSON.stringify(state.modalHistory));
		},
		removeLastFromHistory: (state) => {
			state.modalHistory = state.modalHistory.slice(0, -1);
			localStorage.setItem("modalHistory", JSON.stringify(state.modalHistory));
		},
		clearHistory: (state) => {
			state.modalHistory = [];
			localStorage.removeItem("modalHistory");
		},
		completePurchase: (state) => {
			const newPurchasedSeats: PurchasedSeat[] = state.selectedSeats.map(
				(seat) => ({
					...seat,
					status: "unavailable" as const,
					purchaseDate: new Date().toISOString(),
				})
			);

			const currentPurchased = localStorage.getItem(
				STORAGE_KEYS.PURCHASED_SEATS
			);
			const purchasedMap = currentPurchased ? JSON.parse(currentPurchased) : {};

			newPurchasedSeats.forEach((seat) => {
				if (!purchasedMap[seat.sectionId]) {
					purchasedMap[seat.sectionId] = [];
				}
				if (!purchasedMap[seat.sectionId].includes(seat.id)) {
					purchasedMap[seat.sectionId].push(seat.id);
				}
			});

			localStorage.setItem(
				STORAGE_KEYS.PURCHASED_SEATS,
				JSON.stringify(purchasedMap)
			);
			state.purchasedSeats = [...state.purchasedSeats, ...newPurchasedSeats];
			state.selectedSeats = [];
			localStorage.removeItem("selectedSeats");
		},
		clearAllData: (state) => {
			state.selectedSeats = [];
			state.modalHistory = [];
			localStorage.removeItem("selectedSeats");
			localStorage.removeItem("modalHistory");
		},
	},
});

export const {
	addSeat,
	removeSeat,
	clearSeats,
	addToHistory,
	removeLastFromHistory,
	clearHistory,
	completePurchase,
	clearAllData,
} = seatSelectionSlice.actions;

// Selectors
export const selectSelectedSeats = (state: RootState) =>
	state.seatSelection.selectedSeats;
export const selectModalHistory = (state: RootState) =>
	state.seatSelection.modalHistory;
export const selectPurchasedSeats = (state: RootState) =>
	state.seatSelection.purchasedSeats;
export const selectTotalPrice = (state: RootState) =>
	state.seatSelection.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
export const selectSeatsForSection = (state: RootState, sectionId: string) =>
	state.seatSelection.selectedSeats.filter(
		(seat) => seat.sectionId === sectionId
	);
export const selectIsPurchased = (state: RootState, seatId: string) =>
	state.seatSelection.purchasedSeats.some((seat) => seat.id === seatId);

export default seatSelectionSlice.reducer;
