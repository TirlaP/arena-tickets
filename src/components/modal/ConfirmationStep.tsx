import React from "react";
import { OrderSummary } from "../../types";

const PAYMENT_METHODS = [
	{ id: "card", name: "Card bancar" },
	{ id: "transfer", name: "Transfer bancar" },
	{ id: "cash", name: "Numerar la sediu" },
];

interface ConfirmationStepProps {
	orderSummary: OrderSummary;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
	orderSummary,
}) => {
	// Group seats by section for display
	const sectionGroups = orderSummary.seats.reduce((groups, seat) => {
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
	}, {} as Record<string, { sectionType: string; seats: typeof orderSummary.seats; totalPrice: number }>);

	const paymentMethodName =
		PAYMENT_METHODS.find((m) => m.id === orderSummary.paymentMethod)?.name ||
		orderSummary.paymentMethod;

	return (
		<div className="p-4 h-[400px] overflow-y-auto">
			<div className="text-center mb-8">
				<div className="text-green-500 text-5xl mb-4">✓</div>
				<h3 className="text-xl font-medium text-gray-700 mb-2">
					Comandă finalizată cu succes!
				</h3>
				<p className="text-gray-600">
					Vei primi un email cu confirmarea comenzii.
				</p>
			</div>

			<div className="bg-gray-50 rounded-lg p-4">
				<h4 className="font-medium text-gray-700 mb-4">Detalii comandă:</h4>
				<div className="space-y-4">
					{Object.entries(sectionGroups).map(([sectionId, group]) => (
						<div key={sectionId} className="border-b pb-3">
							<h5 className="font-medium text-gray-700 mb-2">
								{group.sectionType === "vip"
									? `VIP ${sectionId}`
									: `Sector ${sectionId}`}
							</h5>
							<div className="text-sm text-gray-600">
								<div>Număr locuri: {group.seats.length}</div>
								<div>Subtotal: {group.totalPrice} lei</div>
							</div>
						</div>
					))}

					<div className="pt-2 space-y-2">
						<div className="text-gray-600">
							Metodă de plată: {paymentMethodName}
						</div>
						<div className="text-lg font-medium text-gray-700">
							Total plătit: {orderSummary.totalPrice} lei
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
