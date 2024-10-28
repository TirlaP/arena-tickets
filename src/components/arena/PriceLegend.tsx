import { PRICES_CONFIG } from "../../utils/constants";

export const PriceLegend = () => {
	return (
		<div className="flex justify-center gap-4 mb-4">
			{PRICES_CONFIG.map((item) => (
				<div key={item.label || item.price} className="flex items-center gap-2">
					<div
						className="w-3 h-3 rounded-full"
						style={{ backgroundColor: item.color }}
					/>
					<span className="text-sm">
						{"price" in item ? `${item.price} lei` : item.label}
					</span>
				</div>
			))}
		</div>
	);
};
