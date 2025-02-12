import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`); 
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage((prevPage) => prevPage + 1);
      } else {
        sethasMore(false);
      }
    } catch (e) {
      console.error("Error fetching popular movies:", e);
      sethasMore(false);
    }
  };
  

  const refreshHandler = () => {
    setpage(1);
    setpopular([]);
    sethasMore(true);
    GetPopular();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-1"
          ></i>
          Popular
        </h1>
        <div className="flex items-center w-[80%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <VerticalCards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
