import { configureStore } from "@reduxjs/toolkit";
import seatSelectionReducer from "./features/seatSelectionSlice";

export const store = configureStore({
	reducer: {
		seatSelection: seatSelectionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
