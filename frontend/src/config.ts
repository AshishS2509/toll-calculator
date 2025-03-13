const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

const theme = localStorage.getItem("theme") || "light";

let MAP_STYLE_URL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`;
if (theme === "dark")
  MAP_STYLE_URL = `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${MAPTILER_API_KEY}`;

export default MAP_STYLE_URL;
