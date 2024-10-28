type SectionConfig = {
	color: string;
	price: number;
};

type StandardSectionId =
	| "201"
	| "202"
	| "203"
	| "204"
	| "205"
	| "206"
	| "207"
	| "208"
	| "209"
	| "210"
	| "211"
	| "212"
	| "213";

export const SECTION_COLORS: Record<StandardSectionId, SectionConfig> = {
	// 800 lei sections
	"201": { color: "#73899b", price: 800 },
	"202": { color: "#73899b", price: 800 },
	"212": { color: "#73899b", price: 800 },
	"213": { color: "#73899b", price: 800 },

	// 1300 lei sections
	"203": { color: "#366dc4", price: 1300 },
	"204": { color: "#366dc4", price: 1300 },
	"210": { color: "#366dc4", price: 1300 },
	"211": { color: "#366dc4", price: 1300 },

	// 1500 lei sections
	"205": { color: "#1db2bc", price: 1500 },
	"209": { color: "#1db2bc", price: 1500 },

	// 1800 lei sections
	"206": { color: "#abc47a", price: 1800 },
	"207": { color: "#abc47a", price: 1800 },
	"208": { color: "#abc47a", price: 1800 },
};

export const VIP_COLOR = "#77113d";
export const VIP_PRICE = 3000;
export const UNAVAILABLE_COLOR = "#d2d3d3";
export const SELECTED_COLOR = "#4CAF50";

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

export const getSectionPrice = (
	sectionId: string,
	sectionType: "standard" | "vip"
): number => {
	if (sectionType === "vip") return VIP_PRICE;
	return SECTION_COLORS[sectionId as StandardSectionId]?.price || 800;
};

export const getSectionColor = (
	sectionId: string,
	sectionType: "standard" | "vip",
	isAvailable: boolean
): string => {
	if (!isAvailable) return UNAVAILABLE_COLOR;
	if (sectionType === "vip") return VIP_COLOR;
	return SECTION_COLORS[sectionId as StandardSectionId]?.color || "#73899b";
};

export const getSeatColor = (
	sectionId: string,
	sectionType: "standard" | "vip",
	status: "available" | "unavailable" | "selected"
): string => {
	if (status === "unavailable") return UNAVAILABLE_COLOR;
	if (status === "selected") return SELECTED_COLOR;
	if (sectionType === "vip") return VIP_COLOR;
	return SECTION_COLORS[sectionId as StandardSectionId]?.color || "#73899b";
};
