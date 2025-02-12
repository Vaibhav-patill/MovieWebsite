import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data, onWatchTrailer }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat", 
      }}
      className="w-full h-[57vh] flex flex-col justify-end align-start p-[5%]"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.title || data.name || data.original_name || data.original_title}
      </h1>
      
      <p className="text-white mt-3 mb-3 w-[70%]">
        {data.overview.slice(0,200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400 underline ml-2"
        >
          More
        </Link>
      </p>
      
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill"></i> {data.release_date || "No Information"}
        <i className="ml-4 text-yellow-500 ri-album-fill"></i> {data.media_type.toUpperCase()}
      </p>

      {data.release_date ? (
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="px-3 py-1 rounded-md hover:bg-purple-700 bg-purple-500 font-semibold mt-2 w-30">
          Watch Trailer
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
