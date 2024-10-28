import {
	selectSelectedSeats,
	selectTotalPrice,
} from "@/redux/features/seatSelectionSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

interface PaymentStepProps {
	selectedPayment: string | null;
	onPaymentSelect: (paymentId: string) => void;
}

const PAYMENT_METHODS = [
	{ id: "card", name: "Card bancar" },
	{ id: "transfer", name: "Transfer bancar" },
	{ id: "cash", name: "Numerar la sediu" },
];

export const PaymentStep: React.FC<PaymentStepProps> = ({
	selectedPayment,
	onPaymentSelect,
}) => {
	const selectedSeats = useAppSelector(selectSelectedSeats);
	const totalPrice = useAppSelector(selectTotalPrice);

	// Group seats by section
	const sectionGroups = selectedSeats.reduce((groups, seat) => {
		if (!groups[seat.sectionId]) {
			groups[seat.sectionId] = {
				sectionType: seat.sectionType,
				seats: [],
				totalPrice: 0,
			};
		}
		groups[seat.sectionId].seats.push(seat);
		groups[seat.sectionId].totalPrice += seat.price;
		return groups;
	}, {} as Record<string, { sectionType: string; seats: typeof selectedSeats; totalPrice: number }>);

	return (
		<div className="p-4 h-[400px] overflow-y-auto">
			<div className="space-y-4">
				<h3 className="text-lg font-medium text-gray-700 mb-4">
					Selectează metoda de plată
				</h3>

				{/* Payment Methods */}
				<div className="space-y-3 mb-6">
					{PAYMENT_METHODS.map((method) => (
						<div key={method.id} className="flex items-center space-x-3">
							<input
								type="radio"
								id={method.id}
								name="payment"
								value={method.id}
								checked={selectedPayment === method.id}
								onChange={(e) => onPaymentSelect(e.target.value)}
								className="h-4 w-4 text-blue-600"
							/>
							<label htmlFor={method.id} className="text-gray-700">
								{method.name}
							</label>
						</div>
					))}
				</div>

				{/* Order Summary */}
				<div className="bg-gray-50 rounded-lg p-4">
					<h4 className="font-medium text-gray-700 mb-4">Sumar comandă:</h4>
					<div className="space-y-4">
						{Object.entries(sectionGroups).map(([sectionId, group]) => (
							<div key={sectionId} className="border-b pb-3">
								<h5 className="font-medium text-gray-700 mb-2">
									{group.sectionType === "vip"
										? `VIP ${sectionId}`
										: `Sector ${sectionId}`}
								</h5>
								<div className="text-sm text-gray-600 space-y-1">
									{group.seats.map((seat) => (
										<div key={seat.id} className="flex justify-between">
											<span>
												Rând {seat.row}, Loc {seat.number}
											</span>
											<span>{seat.price} lei</span>
										</div>
									))}
									<div className="font-medium pt-1">
										Subtotal: {group.totalPrice} lei
									</div>
								</div>
							</div>
						))}
						<div className="text-lg font-medium text-gray-700 pt-2">
							Total general: {totalPrice} lei
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentStep;
