import React from "react";
import { PRICES_CONFIG } from "../../utils/constants";

export const PriceLegend: React.FC = () => (
	<div className="flex flex-wrap justify-center gap-4 mb-6">
		{PRICES_CONFIG.map((item) => (
			<div key={item.label || item.price} className="flex items-center gap-2">
				<div
					className="w-4 h-4 rounded"
					style={{ backgroundColor: item.color }}
				/>
				<span className="text-gray-700">
					{"price" in item ? `${item.price} lei` : item.label}
				</span>
			</div>
		))}
	</div>
);
