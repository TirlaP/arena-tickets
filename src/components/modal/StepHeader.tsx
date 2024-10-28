import React from "react";

interface StepHeaderProps {
	currentStep: number;
	canNavigate: (step: number) => boolean;
	onStepClick: (step: number) => void;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
	currentStep,
	canNavigate,
	onStepClick,
}) => (
	<div className="flex border-b">
		{["Data și locul (biletul)", "Metoda de plată", "Finalizat!"].map(
			(title, index) => (
				<div
					key={index}
					className={`flex-1 p-4 text-center font-medium cursor-pointer
          ${
						currentStep >= index + 1
							? "bg-orange-400 text-white"
							: "text-gray-700"
					}
          ${canNavigate(index + 1) ? "cursor-pointer" : "cursor-not-allowed"}`}
					onClick={() => canNavigate(index + 1) && onStepClick(index + 1)}
				>
					{`${index + 1}. ${title}`}
				</div>
			)
		)}
	</div>
);
