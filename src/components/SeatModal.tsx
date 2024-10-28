import {
	addSeat,
	addToHistory,
	clearAllData,
	completePurchase,
	removeSeat,
	selectModalHistory,
	selectSelectedSeats,
	selectTotalPrice,
} from "@/redux/features/seatSelectionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { OrderSummary, Seat } from "../types";
import { getPurchasedSeats } from "../utils/storage";
import { ConfirmationStep } from "./modal/ConfirmationStep";
import { NavigationButtons } from "./modal/NavigationButtons";
import { PaymentStep } from "./modal/PaymentStep";
import { PriceLegend } from "./modal/PriceLegend";
import { SeatGrid } from "./modal/SeatGrid";
import { StepHeader } from "./modal/StepHeader";

interface SeatModalProps {
	isOpen: boolean;
	onClose: () => void;
	sectionId: string;
	sectionType: "standard" | "vip";
	onBack: () => void;
	onSectionChange: (sectionId: string, sectionType: "standard" | "vip") => void;
}

export const SeatModal: React.FC<SeatModalProps> = ({
	isOpen,
	onClose,
	sectionId,
	sectionType,
	onBack,
	onSectionChange,
}) => {
	const dispatch = useAppDispatch();
	const selectedSeats = useAppSelector(selectSelectedSeats);
	const modalHistory = useAppSelector(selectModalHistory);
	const totalPrice = useAppSelector(selectTotalPrice);

	const [step, setStep] = useState(1);
	const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
	const [seats, setSeats] = useState<Seat[]>([]);
	const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

	useEffect(() => {
		if (isOpen) {
			setStep(1);
			setSelectedPayment(null);
			setOrderSummary(null);
		}
	}, [isOpen]);

	useEffect(() => {
		const config =
			sectionType === "vip"
				? {
						rows: ["A", "B", "C", "D", "E", "F"],
						seatsPerRow: 12,
				  }
				: {
						rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
						seatsPerRow: 22,
				  };

		const initialSeats: Seat[] = [];
		const selectedSeatIds = new Set(selectedSeats.map((s) => s.id));
		const purchasedSeats = getPurchasedSeats(sectionId);

		dispatch(addToHistory({ sectionId, sectionType }));

		config.rows.forEach((row) => {
			for (let number = 1; number <= config.seatsPerRow; number++) {
				const seatId = `${sectionId}-${row}-${number}`;

				const basePrice =
					sectionType === "vip"
						? 3000
						: (() => {
								switch (sectionId) {
									case "201":
									case "202":
									case "212":
									case "213":
										return 800;
									case "203":
									case "204":
									case "210":
									case "211":
										return 1300;
									case "205":
									case "209":
										return 1500;
									case "206":
									case "207":
									case "208":
										return 1800;
									default:
										return 800;
								}
						  })();

				const status = purchasedSeats.includes(seatId)
					? "unavailable"
					: selectedSeatIds.has(seatId)
					? "selected"
					: "available";

				initialSeats.push({
					id: seatId,
					row,
					number,
					price: basePrice,
					status,
					sectionId,
					sectionType,
				});
			}
		});

		setSeats(initialSeats);
	}, [sectionId, sectionType, selectedSeats, dispatch]);

	const handleSeatToggle = (seat: Seat) => {
		if (seat.status === "unavailable") return;

		const isSelected = selectedSeats.some((s) => s.id === seat.id);
		if (isSelected) {
			dispatch(removeSeat(seat.id));
		} else {
			dispatch(addSeat(seat));
		}

		setSeats((currentSeats) =>
			currentSeats.map((s) =>
				s.id === seat.id
					? { ...s, status: isSelected ? "available" : "selected" }
					: s
			)
		);
	};

	const renderOtherSectionsInfo = () => {
		const otherSections = modalHistory
			.filter((section) => section.sectionId !== sectionId)
			.map((section) => {
				const seatsInSection = selectedSeats.filter(
					(seat) => seat.sectionId === section.sectionId
				);
				if (seatsInSection.length === 0) return null;

				const sectionTotal = seatsInSection.reduce(
					(sum, seat) => sum + seat.price,
					0
				);

				return (
					<div
						key={section.sectionId}
						className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
						onClick={() =>
							onSectionChange(section.sectionId, section.sectionType)
						}
					>
						<span className="text-gray-700">
							{section.sectionType === "vip"
								? `VIP ${section.sectionId}`
								: `Sector ${section.sectionId}`}
							: {seatsInSection.length} locuri
						</span>
						<span className="text-gray-600 font-medium">
							{sectionTotal} lei
						</span>
					</div>
				);
			})
			.filter(Boolean);

		if (otherSections.length === 0) return null;

		return (
			<div className="mt-4 p-4 border rounded-lg">
				<h3 className="text-gray-700 font-medium mb-3">
					Selecții în alte secțiuni:
				</h3>
				<div className="space-y-2">{otherSections}</div>
			</div>
		);
	};

	const handleNext = () => {
		if (step === 1 && selectedSeats.length > 0) {
			setStep(2);
		} else if (step === 2 && selectedPayment) {
			const summary: OrderSummary = {
				seats: selectedSeats,
				paymentMethod: selectedPayment,
				totalPrice: totalPrice,
				date: new Date().toISOString(),
			};
			setOrderSummary(summary);

			dispatch(completePurchase());
			setStep(3);
		}
	};

	const handleBack = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	const handleClose = () => {
		if (step === 3) {
			dispatch(clearAllData());
			setStep(1);
			setSelectedPayment(null);
			setOrderSummary(null);
		}
		onClose();
	};

	const canNavigateToStep = (targetStep: number) => {
		if (targetStep === 1) return true;
		if (targetStep === 2) return selectedSeats.length > 0;
		if (targetStep === 3)
			return selectedSeats.length > 0 && selectedPayment !== null;
		return false;
	};

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return (
					<>
						<PriceLegend />
						<NavigationButtons onBack={onBack} onClose={onClose} />
						<div className="text-center mb-4 text-gray-700 font-medium">
							{sectionType === "vip"
								? `VIP ${sectionId}`
								: `Sector ${sectionId}`}
						</div>
						<SeatGrid
							seats={seats}
							selectedSeats={selectedSeats}
							onSeatToggle={handleSeatToggle}
						/>
						{renderOtherSectionsInfo()}
					</>
				);
			case 2:
				return (
					<PaymentStep
						selectedPayment={selectedPayment}
						onPaymentSelect={setSelectedPayment}
					/>
				);
			case 3:
				return orderSummary && <ConfirmationStep orderSummary={orderSummary} />;
			default:
				return null;
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={handleClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-50" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
								<StepHeader
									currentStep={step}
									canNavigate={canNavigateToStep}
									onStepClick={setStep}
								/>

								<div className="p-6">
									<div className="text-center mb-4 text-gray-700 font-medium">
										03 noiembrie, 17:00
									</div>

									{renderStepContent()}

									{/* Bottom Bar with Selection Info and Navigation */}
									<div className="mt-4 border-t pt-4 flex justify-between items-center">
										<div className="text-gray-700">
											{step === 1 && selectedSeats.length > 0 && (
												<div className="flex items-center gap-4">
													<span>Locuri selectate: {selectedSeats.length}</span>
													<span>Total: {totalPrice} lei</span>
												</div>
											)}
										</div>
										<div className="flex gap-4">
											{step > 1 && step < 4 && (
												<button
													onClick={handleBack}
													className="px-6 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
												>
													Înapoi
												</button>
											)}
											{step < 3 && (
												<button
													onClick={handleNext}
													disabled={!canNavigateToStep(step + 1)}
													className={`px-6 py-2 rounded text-white
                          ${
														canNavigateToStep(step + 1)
															? "bg-blue-600 hover:bg-blue-700"
															: "bg-gray-400 cursor-not-allowed"
													}`}
												>
													{step === 1
														? "Continuă spre plată"
														: "Finalizează comanda"}
												</button>
											)}
											{step === 3 && (
												<button
													onClick={handleClose}
													className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
												>
													Închide
												</button>
											)}
										</div>
									</div>

									{/* Section Number at Bottom */}
									<div className="mt-4 text-center text-gray-500">
										{sectionId}
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SeatModal;
