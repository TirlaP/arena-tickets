import { SectionProps } from "../types";
// Standard sections
import Section201 from "@/assets/Standard/Section-201.svg";
import Section202 from "@/assets/Standard/Section-202.svg";
import Section203 from "@/assets/Standard/Section-203.svg";
import Section204 from "@/assets/Standard/Section-204.svg";
import Section205 from "@/assets/Standard/Section-205.svg";
import Section206 from "@/assets/Standard/Section-206.svg";
import Section207 from "@/assets/Standard/Section-207.svg";
import Section208 from "@/assets/Standard/Section-208.svg";
import Section209 from "@/assets/Standard/Section-209.svg";
import Section210 from "@/assets/Standard/Section-210.svg";
import Section211 from "@/assets/Standard/Section-211.svg";
import Section212 from "@/assets/Standard/Section-212.svg";
import Section213 from "@/assets/Standard/Section-213.svg";

// VIP sections
import SectionVip1 from "@/assets/Vip/Section-Vip-1.svg";
import SectionVip10 from "@/assets/Vip/Section-Vip-10.svg";
import SectionVip11 from "@/assets/Vip/Section-Vip-11.svg";
import SectionVip12 from "@/assets/Vip/Section-Vip-12.svg";
import SectionVip13 from "@/assets/Vip/Section-Vip-13.svg";
import SectionVip14 from "@/assets/Vip/Section-Vip-14.svg";
import SectionVip2 from "@/assets/Vip/Section-Vip-2.svg";
import SectionVip3 from "@/assets/Vip/Section-Vip-3.svg";
import SectionVip4 from "@/assets/Vip/Section-Vip-4.svg";
import SectionVip5 from "@/assets/Vip/Section-Vip-5.svg";
import SectionVip6 from "@/assets/Vip/Section-Vip-6.svg";
import SectionVip7 from "@/assets/Vip/Section-Vip-7.svg";
import SectionVip8 from "@/assets/Vip/Section-Vip-8.svg";
import SectionVip9 from "@/assets/Vip/Section-Vip-9.svg";
import { getSectionColor, getSectionPrice } from "@/utils/seatingConfig";
import { getPurchasedSeats } from "@/utils/storage";
import { useEffect, useState } from "react";

type SvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface SectionMapping {
	standard: Record<string, SvgComponent>;
	vip: Record<string, SvgComponent>;
}

const sections: SectionMapping = {
	standard: {
		"201": Section201,
		"202": Section202,
		"203": Section203,
		"204": Section204,
		"205": Section205,
		"206": Section206,
		"207": Section207,
		"208": Section208,
		"209": Section209,
		"210": Section210,
		"211": Section211,
		"212": Section212,
		"213": Section213,
	},
	vip: {
		"1": SectionVip1,
		"2": SectionVip2,
		"3": SectionVip3,
		"4": SectionVip4,
		"5": SectionVip5,
		"6": SectionVip6,
		"7": SectionVip7,
		"8": SectionVip8,
		"9": SectionVip9,
		"10": SectionVip10,
		"11": SectionVip11,
		"12": SectionVip12,
		"13": SectionVip13,
		"14": SectionVip14,
	},
};

const SvgWrapper = ({
	children,
	color,
}: {
	children: React.ReactNode;
	color: string;
}) => {
	return (
		<div style={{ color: color }} className="[&_svg_*]:fill-current">
			{children}
		</div>
	);
};

const Section = ({ id, type, onClick, className = "" }: SectionProps) => {
	const [isAvailable, setIsAvailable] = useState(true);
	const SectionComponent =
		type === "vip" ? sections.vip[id] : sections.standard[id];

	useEffect(() => {
		const purchasedSeats = getPurchasedSeats(id);
		setIsAvailable(purchasedSeats.length < (type === "vip" ? 72 : 242));
	}, [id, type]);

	if (!SectionComponent) {
		console.warn(`No component found for section ${id} of type ${type}`);
		return null;
	}

	const sectionText = type === "vip" ? `VIP ${id}` : id;
	const sectionColor = getSectionColor(id, type, isAvailable);
	const price = getSectionPrice(id, type);

	return (
		<button
			onClick={() => onClick?.(id)}
			className={`relative transition-opacity hover:opacity-80 ${className}`}
		>
			<div className="relative">
				<SvgWrapper color={sectionColor}>
					<SectionComponent className="" />
				</SvgWrapper>
				<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-medium">
					{sectionText}
				</span>
			</div>
		</button>
	);
};

export default Section;
