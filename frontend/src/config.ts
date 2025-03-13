const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

const getStyleUrl = () => {
  const theme = localStorage.getItem("theme") || "light";
  return `https://api.maptiler.com/maps/streets-v2${
    theme === "dark" ? "-dark" : ""
  }/style.json?key=${MAPTILER_API_KEY}`;
};

export default getStyleUrl;
