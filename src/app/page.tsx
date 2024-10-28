"use client";

import MainContent from "@/components/MainContent";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Page() {
	return (
		<Provider store={store}>
			<div className="min-h-screen flex flex-col">
				<MainContent />
			</div>
		</Provider>
	);
}
