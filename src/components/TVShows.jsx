import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./templates/Dropdown";

const TVShows = () => {
  const navigate = useNavigate();
  const [category,setcategory]=useState("airing_today");
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTVShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTVShows((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Error fetching popular TV shows:", e);
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if(tvShows.length === 0){
      GetTVShows();
    }else{
    setPage(1);
    setTVShows([]);
    setHasMore(true);
    GetTVShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tvShows.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-1"
          ></i>
          TV<small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <TopNav />
        <Dropdown
          title="Category"
          options={[
            "popular", "top_rated", "on_the_air", "airing_today"]}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll dataLength={tvShows.length} next={GetTVShows} hasMore={hasMore} loader={<h1>Loading...</h1>}>
        <VerticalCards data={tvShows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TVShows;
