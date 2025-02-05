/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    ".index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	colors: {
  		transparent: 'transparent',
  		current: 'currentColor',
  		white: '#ffffff',
  		black: '#000000',
  		purple: '#3f3cbb',
  		midnight: '#349a7f',
  		metal: '#565584',
  		tahiti: '#3ab7bf',
  		silver: '#ecebff',
  		'bubble-gum': '#ff77e9',
  		bermuda: '#78dcca',
			red: '#ff0000'
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}

