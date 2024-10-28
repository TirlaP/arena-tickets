import React from "react";
import { Seat } from "../../types";
import { getSeatColor } from "../../utils/seatingConfig";

interface SeatGridProps {
	seats: Seat[];
	selectedSeats: Seat[];
	onSeatToggle: (seat: Seat) => void;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
	seats,
	selectedSeats,
	onSeatToggle,
}) => {
	const getRows = () => {
		const rowMap = new Map<string, Seat[]>();
		seats.forEach((seat) => {
			if (!rowMap.has(seat.row)) {
				rowMap.set(seat.row, []);
			}
			rowMap.get(seat.row)?.push(seat);
		});
		return Array.from(rowMap.entries()).sort((a, b) =>
			a[0].localeCompare(b[0])
		);
	};

	const getSeatStyle = (seat: Seat): string => {
		const color = getSeatColor(seat.sectionId, seat.sectionType, seat.status);
		const isSelected = selectedSeats.some((s) => s.id === seat.id);
		const baseStyle =
			"w-6 h-6 rounded flex items-center justify-center text-xs text-white";

		if (isSelected) {
			return `${baseStyle} bg-[#4CAF50]`;
		}

		return `${baseStyle} ${
			seat.status === "unavailable"
				? "bg-[#d2d3d3] text-gray-700 cursor-not-allowed"
				: `bg-[${color}] hover:opacity-80`
		}`;
	};

	return (
		<div className="border rounded-lg p-4">
			<div className="space-y-2">
				{getRows().map(([row, rowSeats]) => (
					<div key={row} className="flex items-center space-x-2">
						<div className="w-6 text-gray-700 font-medium">{row}</div>
						<div className="flex flex-1 justify-center space-x-1">
							{rowSeats.map((seat) => (
								<button
									key={seat.id}
									disabled={seat.status === "unavailable"}
									onClick={() => onSeatToggle(seat)}
									className={getSeatStyle(seat)}
									style={{
										backgroundColor: selectedSeats.some((s) => s.id === seat.id)
											? "#4CAF50"
											: getSeatColor(
													seat.sectionId,
													seat.sectionType,
													seat.status
											  ),
									}}
								>
									{seat.number}
								</button>
							))}
						</div>
						<div className="w-6 text-gray-700 font-medium">{row}</div>
					</div>
				))}
			</div>
		</div>
	);
};
