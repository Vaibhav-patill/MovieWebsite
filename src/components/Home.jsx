import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom"; // Navigation for details page

function Home() {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const [trailerUrl, setTrailerUrl] = useState(""); // Store trailer URL
  const navigate = useNavigate(); // For navigating to details page

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData || []);
    } catch (e) {
      console.error("Error fetching wallpaper:", e);
      setWallpaper([]);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results || []);
    } catch (e) {
      console.error("Error fetching trending:", e);
      setTrending([]);
    }
  };

  // Function to fetch and show trailer
  const handleWatchTrailer = async (id, media_type) => {
    try {
      const { data } = await axios.get(`/${media_type}/${id}/videos`);
      const trailer = data.results.find((vid) => vid.type === "Trailer"); // Get trailer video
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        alert("No trailer available!");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  document.title = "Movie App";

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} onWatchTrailer={handleWatchTrailer} /> 
        
        <div className="flex justify-between p-10">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e) => setCategory(e.target.value)} />
        </div>
        
        
        <HorizontalCards 
          data={trending} 
          onWatchTrailer={handleWatchTrailer} 
          onViewDetails={(id, media_type) => navigate(`/details/${media_type}/${id}`)}
        />

        {trailerUrl && <TrailerModal trailerUrl={trailerUrl} onClose={() => setTrailerUrl("")} />}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
