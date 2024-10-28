import { PaymentMethod } from "../types";

export const PAYMENT_METHODS: PaymentMethod[] = [
	{ id: "card", name: "Card bancar" },
	{ id: "transfer", name: "Transfer bancar" },
	{ id: "cash", name: "Numerar la sediu" },
];

type PriceConfig =
	| { price: number; color: string; label?: never }
	| { label: string; color: string; price?: never };

export const PRICES_CONFIG: PriceConfig[] = [
	{ price: 500, color: "#4B0082" },
	{ price: 800, color: "#73899b" },
	{ price: 1300, color: "#366dc4" },
	{ price: 1500, color: "#1db2bc" },
	{ price: 1800, color: "#abc47a" },
	{ price: 3000, color: "#77113d" },
	{ label: "Indisponibil", color: "#d2d3d3" },
];
