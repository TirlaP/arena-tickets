export const calculateSeatPrice = (
	row: string,
	sectionType: "standard" | "vip"
): number => {
	// VIP sections are more expensive
	const basePrice = sectionType === "vip" ? 500 : 200;

	// Front rows (A-D) are more expensive
	const rowIndex = row.charCodeAt(0) - 65;
	const rowMultiplier = rowIndex <= 3 ? 1.5 : rowIndex <= 6 ? 1.2 : 1;

	return Math.round(basePrice * rowMultiplier);
};
