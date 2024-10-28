import {
	selectSelectedSeats,
	selectTotalPrice,
} from "@/redux/features/seatSelectionSlice";
import { useAppSelector } from "@/redux/hooks";

interface SelectionSidebarProps {
	onPurchase: () => void;
}

export const SelectionSidebar = ({ onPurchase }: SelectionSidebarProps) => {
	const selectedSeats = useAppSelector(selectSelectedSeats);
	const totalPrice = useAppSelector(selectTotalPrice);

	if (selectedSeats.length === 0) {
		return (
			<div className="w-64 p-4 border-l">
				<div className="text-center text-gray-500">
					<p>Nici un loc selectat</p>
					<p>0 bilete</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-64 p-4 border-l flex flex-col h-full">
			<div className="flex-1">
				<div className="mb-4">
					<h3 className="font-medium mb-2">Sumar selecție:</h3>
					<p>Locuri selectate: {selectedSeats.length}</p>
					<p className="font-medium">Total: {totalPrice} lei</p>
				</div>

				<div className="space-y-2">
					{Object.entries(
						selectedSeats.reduce((acc, seat) => {
							const key =
								seat.sectionType === "vip"
									? `VIP ${seat.sectionId}`
									: `Sector ${seat.sectionId}`;
							acc[key] = (acc[key] || 0) + 1;
							return acc;
						}, {} as Record<string, number>)
					).map(([section, count]) => (
						<div key={section} className="flex justify-between text-sm">
							<span>{section}:</span>
							<span>{count} locuri</span>
						</div>
					))}
				</div>
			</div>

			<button
				onClick={onPurchase}
				className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
			>
				CUMPĂRĂ
			</button>
		</div>
	);
};

export default SelectionSidebar;
