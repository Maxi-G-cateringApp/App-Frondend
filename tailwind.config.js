/** @type {import('tailwindcss').Config} */
module.exports = {
  rippleui: {
		themes: [
			{
				themeName: "dark",
				colorScheme: "light",
				colors: {
					primary: "#235264",
					backgroundPrimary: "#964643",
				},
			},
			{
				themeName: "dark",
				colorScheme: "dark",
				colors: {
					primary: "#573242",
					backgroundPrimary: "#1a1a1a",
				},
			},
		],
	},
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
}

