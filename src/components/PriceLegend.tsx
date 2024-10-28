// components/PriceLegend.tsx
import { PRICES_CONFIG } from "@/utils/constants";

const PriceLegend = () => {
	return (
		<div className="bg-white w-full h-full flex items-center justify-center">
			<div className="flex gap-4">
				{PRICES_CONFIG.map((item) => (
					<div
						key={item.price || item.label}
						className="flex items-center gap-2"
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: item.color }}
						/>
						<span className="text-sm text-gray-600">
							{item.price ? `${item.price} lei` : item.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PriceLegend;
