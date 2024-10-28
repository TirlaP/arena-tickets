import { useEffect } from "react";
import { ArenaSection } from "../types";
import { initializeSeatsData } from "../utils/mockData";
import Section from "./Section";

import SectionEntry from "@/assets/Section-Entry.svg";
import GeneralAccessSection from "@/assets/Section-General-Access.svg";
import StageSection from "@/assets/Section-Stage.svg";

const STANDARD_SECTIONS: ArenaSection[] = [
	// Left side
	{ id: "201", type: "standard", position: "left" },
	{ id: "202", type: "standard", position: "left" },
	{ id: "203", type: "standard", position: "left" },
	{ id: "204", type: "standard", position: "left" },
	{
		id: "205",
		type: "standard",
		position: "left",
		className: "transform -rotate-12",
	},

	// Right side
	{ id: "213", type: "standard", position: "right" },
	{ id: "212", type: "standard", position: "right" },
	{ id: "211", type: "standard", position: "right" },
	{ id: "210", type: "standard", position: "right" },
	{
		id: "209",
		type: "standard",
		position: "right",
		className: "transform rotate-12",
	},

	// Bottom
	{ id: "206", type: "standard", position: "bottom" },
	{ id: "207", type: "standard", position: "bottom" },
	{ id: "208", type: "standard", position: "bottom" },
];

const VIP_SECTIONS: ArenaSection[] = [
	// Left side
	{ id: "1", type: "vip", position: "left" },
	{ id: "2", type: "vip", position: "left" },
	{ id: "3", type: "vip", position: "left" },
	{ id: "4", type: "vip", position: "left" },
	{ id: "5", type: "vip", position: "left" },

	// Right side
	{ id: "14", type: "vip", position: "right" },
	{ id: "13", type: "vip", position: "right" },
	{ id: "12", type: "vip", position: "right" },
	{ id: "11", type: "vip", position: "right" },
	{ id: "10", type: "vip", position: "right" },

	// Bottom
	{ id: "6", type: "vip", position: "bottom" },
	{ id: "7", type: "vip", position: "bottom" },
	{ id: "8", type: "vip", position: "bottom" },
	{ id: "9", type: "vip", position: "bottom" },
];

interface ArenaLayoutProps {
	onSectionSelect: (sectionId: string, type: "standard" | "vip") => void;
	currentSection?: {
		sectionId: string;
		sectionType: "standard" | "vip";
	};
}

const ArenaLayout: React.FC<ArenaLayoutProps> = ({
	onSectionSelect,
	currentSection,
}) => {
	// Initialize seats data when component mounts
	useEffect(() => {
		initializeSeatsData();
	}, []);

	const leftVipSections = VIP_SECTIONS.filter(
		(section) => section.position === "left"
	).slice(0, -1);

	const rightVipSections = VIP_SECTIONS.filter(
		(section) => section.position === "right"
	).slice(0, -1);

	const lastLeftVip = VIP_SECTIONS.find(
		(section) => section.position === "left" && section.id === "5"
	);

	const lastRightVip = VIP_SECTIONS.find(
		(section) => section.position === "right" && section.id === "10"
	);

	const isSelected = (sectionId: string, type: "standard" | "vip") => {
		return (
			currentSection?.sectionId === sectionId &&
			currentSection?.sectionType === type
		);
	};

	const renderLeftColumn = () => (
		<div className="flex flex-col gap-1">
			{leftVipSections.map((section, index, array) => (
				<Section
					key={section.id}
					{...section}
					onClick={() => onSectionSelect(section.id, "vip")}
					className={index === array.length - 1 ? "mr-[-30px]" : ""}
				/>
			))}
		</div>
	);

	const renderLeftStandardColumn = () => (
		<div className="flex flex-col gap-1 mr-[-35px]">
			{STANDARD_SECTIONS.filter((section) => section.position === "left").map(
				(section, index, array) => (
					<Section
						key={section.id}
						{...section}
						onClick={() => onSectionSelect(section.id, "standard")}
						className={index === array.length - 1 ? "mt-[-25px] ml-[10px]" : ""}
					/>
				)
			)}
			{lastLeftVip && (
				<Section
					{...lastLeftVip}
					onClick={() => onSectionSelect(lastLeftVip.id, "vip")}
					className="mt-[-25px] ml-[10px]"
				/>
			)}
		</div>
	);

	const renderRightColumn = () => (
		<div className="flex flex-col gap-1">
			{rightVipSections.map((section, index, array) => (
				<Section
					key={section.id}
					{...section}
					onClick={() => onSectionSelect(section.id, "vip")}
					className={index === array.length - 1 ? "ml-[-30px]" : ""}
				/>
			))}
		</div>
	);

	const renderRightStandardColumn = () => (
		<div className="flex flex-col gap-1 ml-[-20px]">
			{STANDARD_SECTIONS.filter((section) => section.position === "right").map(
				(section, index, array) => (
					<Section
						key={section.id}
						{...section}
						onClick={() => onSectionSelect(section.id, "standard")}
						className={
							index === array.length - 1 ? "mt-[-25px] ml-[-18px]" : ""
						}
					/>
				)
			)}
			{lastRightVip && (
				<Section
					{...lastRightVip}
					onClick={() => onSectionSelect(lastRightVip.id, "vip")}
					className="mt-[-25px] ml-[10px]"
				/>
			)}
		</div>
	);

	const renderBottomSections = () => (
		<div className="flex-1 flex flex-col gap-1 mt-[20px]">
			{/* General Access */}
			<div className="flex items-center justify-center relative">
				<GeneralAccessSection />
				<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-medium">
					GENERAL ACCESS
				</span>
			</div>

			{/* Bottom Sections Container */}
			<div className="flex flex-col gap-1">
				{/* Bottom Standard Sections */}
				<div className="flex justify-center items-center gap-1">
					{STANDARD_SECTIONS.filter(
						(section) => section.position === "bottom"
					).map((section) => (
						<Section
							key={section.id}
							{...section}
							onClick={() => onSectionSelect(section.id, "standard")}
						/>
					))}
				</div>

				{/* Bottom VIP Sections */}
				<div className="flex justify-center items-center gap-1">
					{VIP_SECTIONS.filter((section) => section.position === "bottom")
						.slice(0, 2)
						.map((section) => (
							<Section
								key={section.id}
								{...section}
								onClick={() => onSectionSelect(section.id, "vip")}
							/>
						))}
					<SectionEntry className="flex-shrink-0" />
					{VIP_SECTIONS.filter((section) => section.position === "bottom")
						.slice(2)
						.map((section) => (
							<Section
								key={section.id}
								{...section}
								onClick={() => onSectionSelect(section.id, "vip")}
							/>
						))}
				</div>
			</div>
		</div>
	);

	return (
		<div className="w-fit mx-auto p-8">
			{/* Stage */}
			<div className="flex justify-center relative">
				<StageSection />
				<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-medium">
					STAGE
				</span>
			</div>

			{/* Main Layout */}
			<div className="flex gap-1">
				{renderLeftColumn()}
				{renderLeftStandardColumn()}
				{renderBottomSections()}
				{renderRightStandardColumn()}
				{renderRightColumn()}
			</div>
		</div>
	);
};

export default ArenaLayout;
