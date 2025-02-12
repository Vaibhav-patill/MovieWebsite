import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import queryImg from "/queryImg.png";

const HorizontalCards = ({ data, title }) => {
  return (
    <div className="overflow-x-auto p-4 mb-5">
      <div className="flex gap-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="w-[220px] bg-gray-900 shadow-md rounded-lg overflow-hidden shrink-0 transition-transform transform hover:scale-105"
          >
            <img
              className="w-full h-[200px] object-cover"
              src={`${
                d.poster_path || d.backdrop_path || d.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.poster_path ||
                      d.backdrop_path ||
                      d.profile_path
                    }`
                  : queryImg
              }`}
              alt={d.title || d.name}
            />
            <div className="p-3 text-white">
              <h1 className="text-lg font-semibold truncate">
                {d.title || d.name}
              </h1>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {d.overview
                  ? `${d.overview.slice(0, 80)}...`
                  : "No description available"}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-400 text-xs">
                  {d.release_date || "N/A"}
                </span>
                <Link
                  to={`/${d.media_type || title}/details/${d.id}`}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-md text-xs"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
