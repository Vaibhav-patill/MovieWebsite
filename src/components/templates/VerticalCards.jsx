import React from "react";
import { Link } from "react-router-dom";

const VerticalCards = ({ data, title }) => {
  console.log(data);
  return (
    <div className="flex flex-wrap w-full h-full px-[5%] bg-[#1f1e24] gap-16 justify-center overflow-y-auto">
      {data.map((item, index) => {
        // Determine image source
        const imageUrl =
          item.profile_path
            ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
            : item.poster_path || item.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`
            : "https://via.placeholder.com/500";

        // Determine media type for URL
        const mediaType = item.media_type || (title === "People" ? "person" : "movie");
        const detailsLink = `/details/${mediaType}/${item.id}`;

        return (
          <Link
            to={`/${item.media_type || title}/details/${item.id}`}
            key={index}
            className="relative w-44 md:w-52 h-80 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-gray-900"
          >
            <img
              className="w-full h-70 object-cover"
              src={imageUrl}
              alt={item.name || item.title}
            />
            {item.vote_average && (
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-lg opacity-75">
                ⭐ {item.vote_average.toFixed(1)}
              </span>
            )}
            <div className="text-center text-sm md:text-base font-semibold text-white py-2 px-2 truncate">
              {item.name || item.original_name || item.title || item.original_title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VerticalCards;
