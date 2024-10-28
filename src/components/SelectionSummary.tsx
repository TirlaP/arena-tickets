import {
	selectModalHistory,
	selectSelectedSeats,
} from "@/redux/features/seatSelectionSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

interface SelectionSummaryProps {
	currentSectionId: string;
	onSectionClick: (sectionId: string, sectionType: "standard" | "vip") => void;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
	currentSectionId,
	onSectionClick,
}) => {
	const selectedSeats = useAppSelector(selectSelectedSeats);
	const modalHistory = useAppSelector(selectModalHistory);

	const sectionSummaries = modalHistory
		.filter((section) => section.sectionId !== currentSectionId)
		.map((section) => {
			const seatsInSection = selectedSeats.filter(
				(seat) => seat.sectionId === section.sectionId
			);
			const totalPrice = seatsInSection.reduce(
				(sum, seat) => sum + seat.price,
				0
			);

			if (seatsInSection.length === 0) return null;

			return {
				...section,
				seatCount: seatsInSection.length,
				totalPrice,
			};
		})
		.filter(Boolean);

	if (sectionSummaries.length === 0) return null;

	return (
		<div className="mt-4 p-4 bg-gray-50 rounded-lg">
			<h3 className="font-medium text-gray-700 mb-2">
				Selecții în alte secțiuni:
			</h3>
			<div className="space-y-2">
				{sectionSummaries.map((summary) => (
					<div
						key={summary!.sectionId}
						className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
						onClick={() =>
							onSectionClick(summary!.sectionId, summary!.sectionType)
						}
					>
						<span className="text-gray-700">
							{summary!.sectionType === "vip"
								? `VIP ${summary!.sectionId}`
								: `Sector ${summary!.sectionId}`}
							: {summary!.seatCount} locuri
						</span>
						<span className="text-gray-600">{summary!.totalPrice} lei</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default SelectionSummary;
