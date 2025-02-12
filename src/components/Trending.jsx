import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState } from "react";
import axios from "../utils/axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if(data.results.length > 0) {
        settrending((prevState)=>[...prevState, ...data.results]);
        setpage((prevPage) => prevPage + 1);

      }else{
        sethasMore(false);
      }
      // settrending(data.results || []);
    } catch (e) {
      console.error("Error fetching searches:", e);
      settrending([]);
    }
  };

  const refreshHandler=()=>{
    if(trending.length===0){
      GetTrending();
    }else{
       setpage(1);
       settrending([]);
       GetTrending();
       
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-1"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
      dataLength={trending.length}
      next={GetTrending}
      hasMore={hasMore}
      loader={<h1>Loading...</h1>}
      >
        <VerticalCards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
