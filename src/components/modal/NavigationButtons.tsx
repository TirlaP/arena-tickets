import React from "react";

interface NavigationButtonsProps {
	onBack: () => void;
	onClose: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
	onBack,
	onClose,
}) => (
	<div className="flex gap-4 mb-6">
		<button
			onClick={onBack}
			className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
		>
			Înapoi la alegerea sectorului
		</button>
		<button
			onClick={onClose}
			className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
		>
			Înapoi la eveniment
		</button>
	</div>
);
