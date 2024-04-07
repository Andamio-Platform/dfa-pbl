import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-martel-sans)"],
				mono: ["var(--font-source-code-pro)"]
			},
			backgroundImage: {
				"test-1": "url('/DFAcadmey_Background.png')"
			}
		}
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			"corporate",
			"business",
			"emerald",
			"luxury",
			{
				andamio: {
					primary: "#0F0F23", // rich black
					"primary-content": "#fff", // white
					"primary-focus": "#44108E", // indigo
					secondary: "#FDF9F2",
					"secondary-content": "#2D3339",
					"secondary-focus": "#EFEEE6",
					neutral: "#000", // for lesson content
					accent: "#EF7DF5",
					"accent-content": "#D6D7EB",
					info: "#FFB100", // yellow
					"--rounded-box": "0.2rem",
					"--rounded-btn": "0.2rem"
				}
			}
		]
	}
};
export default config;
