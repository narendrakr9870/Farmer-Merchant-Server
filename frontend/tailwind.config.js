/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bsd': "10px 10px 15px rgb(31, 230, 91)"
      },
      backgroundImage: {
        'grad': "linear-gradient(to bottom, rgba(255,0,0,0),rgba(4, 237, 253,0.5))",
        // 'image1': "url(./src/images/image1.jpg)",
        // 'image2': "url(./src/images/image2.jpg)",
        // 'image3': "url(./src/images/image3.jpg)",
        // 'image4': "url(./src/images/image4.webp)"
      },
      animation: {
        'bannerImage': 'bannerImage 16s ease-in infinite'
      },
      // keyframes: {
      //   bannerImage: {
      //     '0%':  "bg-[url('./src/images/image2.jpg')]"
      //     '33.33%': { background-image: url(./src/images/image2.jpg) },
      //     '66.67%': {background-image: url(./src/images/image3.jpg)},
      //     '100%': {background-image: url(./src/images/image4.webp)}
      //   }
      // }
    },
  },
  plugins: [],
}

