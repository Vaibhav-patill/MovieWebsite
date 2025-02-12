import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Error fetching popular people:", e);
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPeople([]);
    setHasMore(true);
    GetPeople();
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return people.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-1"
          ></i>
          Popular People
        </h1>
        <TopNav />
      </div>

      <InfiniteScroll dataLength={people.length} next={GetPeople} hasMore={hasMore} loader={<h1>Loading...</h1>}>
        <VerticalCards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
