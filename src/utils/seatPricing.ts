export const SECTION_CONFIGS = {
	standard: {
		dimensions: {
			rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
			seatsPerRow: 22,
		},
		prices: {
			"201": 800,
			"202": 800,
			"203": 1300,
			"204": 1300,
			"205": 1500,
			"206": 1800,
			"207": 1800,
			"208": 1800,
			"209": 1500,
			"210": 1300,
			"211": 1300,
			"212": 800,
			"213": 800,
		},
	},
	vip: {
		dimensions: {
			rows: ["A", "B", "C", "D", "E", "F"],
			seatsPerRow: 12,
		},
		price: 3000,
	},
};

export const getSectionDimensions = (sectionType: "standard" | "vip") => {
	return SECTION_CONFIGS[sectionType].dimensions;
};

export const getSeatPrice = (
	sectionId: string,
	sectionType: "standard" | "vip"
) => {
	if (sectionType === "vip") return SECTION_CONFIGS.vip.price;
	return (
		SECTION_CONFIGS.standard.prices[
			sectionId as keyof typeof SECTION_CONFIGS.standard.prices
		] || 800
	);
};
