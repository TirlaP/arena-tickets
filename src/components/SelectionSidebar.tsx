import {
	selectSelectedSeats,
	selectTotalPrice,
} from "@/redux/features/seatSelectionSlice";
import { useAppSelector } from "@/redux/hooks";

interface SelectionSidebarProps {
	onPurchase: () => void;
}

const SelectionSidebar = ({ onPurchase }: SelectionSidebarProps) => {
	const selectedSeats = useAppSelector(selectSelectedSeats);
	const totalPrice = useAppSelector(selectTotalPrice);

	type SectionCount = {
		[key: string]: number;
	};

	const sectionCounts = selectedSeats.reduce<SectionCount>((acc, seat) => {
		const key =
			seat.sectionType === "vip"
				? `VIP ${seat.sectionId}`
				: `Sector ${seat.sectionId}`;
		return {
			...acc,
			[key]: (acc[key] || 0) + 1,
		};
	}, {});

	return (
		<div className="w-80 bg-white shadow-lg h-screen flex flex-col fixed right-0 top-0">
			<div className="p-6 flex-1">
				{selectedSeats.length === 0 ? (
					<div className="h-full flex flex-col items-center justify-center text-gray-400">
						<p className="text-lg">Nici un loc selectat</p>
						<p className="mt-1">0 bilete</p>
					</div>
				) : (
					<div className="space-y-6">
						<div>
							<div className="text-lg font-medium text-gray-800">
								Bilete selectate
							</div>
							<div className="mt-2 text-sm text-gray-500">
								{selectedSeats.length}{" "}
								{selectedSeats.length === 1 ? "bilet" : "bilete"}
							</div>
						</div>

						<div className="space-y-3">
							{Object.entries(sectionCounts).map(([section, count]) => (
								<div
									key={section}
									className="flex justify-between text-sm text-gray-600"
								>
									<span>{section}</span>
									<span>
										{count} {count === 1 ? "loc" : "locuri"}
									</span>
								</div>
							))}
						</div>

						<div className="pt-4 border-t">
							<div className="flex justify-between items-center">
								<span className="text-gray-600">Total</span>
								<span className="text-lg font-medium text-gray-800">
									{totalPrice} lei
								</span>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="p-6 border-t bg-gray-50">
				<button
					onClick={onPurchase}
					disabled={selectedSeats.length === 0}
					className={`w-full py-3 rounded-lg text-white transition-colors ${
						selectedSeats.length > 0
							? "bg-blue-600 hover:bg-blue-700"
							: "bg-gray-300"
					}`}
				>
					CUMPĂRĂ
				</button>
			</div>
		</div>
	);
};

export default SelectionSidebar;
