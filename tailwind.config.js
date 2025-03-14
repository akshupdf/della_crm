/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, 
  content: ["./src/**/*.{html,js,jsx,ts,tsx}",'./node_modules/antd/dist/antd.css'],
  theme: {
    extend: {},
    fontFamily: {
      sen: ["Sen", "sans-serif"],
      lora: ["Lora", "sans-serif"],
    },screens: {
      'sm': '300px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

