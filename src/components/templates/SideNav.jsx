import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {

  

  return (
    <>
      <div className="w-[20%] h-full  border-r-2 border-zinc-200 p-8">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-3"></i>
          <span className="text-2xl ">Movie App</span>
        </h1>

        <nav className="flex flex-col text-zinc-400 text-xl gap-3 ">
          <h1 className="text-white font-semibold text-xl mt-8 mb-3">
            New Feeds
          </h1>
          <Link to={"/trending"} className="hover:bg-[#6556CD] p-3 hover:text-white duration-300 rounded-lg">
            <i className="mr-1 ri-fire-fill"></i>Trending
          </Link>
          <Link to={'/popular'} className="hover:bg-[#6556CD] p-3 hover:text-white duration-300 rounded-lg">
            <i className="mr-2 ri-bard-fill"></i>Popular
          </Link>
          <Link to={'/movie'} className="hover:bg-[#6556CD] p-3 hover:text-white duration-300 rounded-lg">
            <i className="mr-2 ri-movie-2-fill"></i>Movies
          </Link>
          <Link to={"/tv"} className="hover:bg-[#6556CD] p-3 hover:text-white duration-300 rounded-lg">
            <i className="mr-2 ri-tv-fill"></i>TV Shows
          </Link>
          <Link to={'/person'} className="hover:bg-[#6556CD] p-3 hover:text-white duration-300 rounded-lg">
            <i className="mr-2 ri-team-fill"></i>People
          </Link>
        </nav>
        <hr className="border-none bg-zinc-200 h-[1px]" />
        <nav className="flex flex-col text-zinc-400 text-xl gap-3 ">
          <h1 className="text-white font-semibold text-xl mt-8 mb-3">
            Website Information
          </h1>
          <Link className="hover:bg-[#6556CD] p-3 hover:text-white duration-300 rounded-lg">
          <i className="mr-2 ri-information-2-fill"></i>About
          </Link>
          <Link className="hover:bg-[#6556CD] p-3 hover:text-white duration-300 rounded-lg">
          <i className="mr-2 ri-phone-fill"></i>Contact Us
          </Link>
          
        </nav>
      </div>
    </>
  );
};

export default SideNav;
