// components/MainContent.tsx
import { selectSelectedSeats } from "@/redux/features/seatSelectionSlice";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import ArenaLayout from "./ArenaLayout";
import PriceLegend from "./PriceLegend";
import SeatModal from "./SeatModal";
import SelectionSidebar from "./SelectionSidebar";

// Main content component
const MainContent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentSection, setCurrentSection] = useState<{
		sectionId: string;
		sectionType: "standard" | "vip";
	}>({ sectionId: "201", sectionType: "standard" });

	const selectedSeats = useAppSelector(selectSelectedSeats);

	const handleSectionChange = (sectionId: string, type: "standard" | "vip") => {
		setCurrentSection({ sectionId, sectionType: type });
	};

	return (
		<div className="flex flex-1">
			{/* Main Content Area */}
			<div className="flex-1 mr-80">
				{/* Navigation Bar with Price Legend */}
				<div className="h-16 border-b">
					<PriceLegend />
				</div>

				{/* Arena Layout */}
				<div className="max-w-6xl mx-auto p-8">
					<ArenaLayout
						onSectionSelect={(sectionId, type) => {
							handleSectionChange(sectionId, type);
							setIsModalOpen(true);
						}}
						currentSection={currentSection}
					/>
				</div>
			</div>

			{/* Fixed Sidebar */}
			<SelectionSidebar onPurchase={() => setIsModalOpen(true)} />

			{/* Seat Modal */}
			{isModalOpen && (
				<SeatModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					sectionId={currentSection.sectionId}
					sectionType={currentSection.sectionType}
					onBack={() => setIsModalOpen(false)}
					onSectionChange={handleSectionChange}
				/>
			)}
		</div>
	);
};

export default MainContent;
