/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	swcMinify: true,
	reactStrictMode: true,
	images: {
		domains: [],
	},
	webpack(config) {
		// Add SVG handling
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};

module.exports = nextConfig;
