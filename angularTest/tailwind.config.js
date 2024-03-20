/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/home/home.component.{html,ts}",
    "./src/app/login/login.component.{html,ts}",
    "./src/app/nav-top/nav-top.component.{html,ts}",
    "./src/app/banned/banned.component.{html,ts}",
    "./src/app/sidebar-small-light/sidebar-small-light.component.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

