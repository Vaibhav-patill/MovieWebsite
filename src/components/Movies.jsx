import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./templates/Dropdown";

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [category, setcategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Error fetching popular movies:", e);
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if(movies.length === 0){
      GetMovies();
    }else{
      setPage(1);
    setMovies([]);
    setHasMore(true);
    GetMovies();
    } 
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movies.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-1"
          ></i>
          Movie<small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={[
            "popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={GetMovies}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <VerticalCards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
