import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import no_image from "/no_image.jpg";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results || []);
    } catch (e) {
      console.error("Error fetching searches:", e);
      setSearches([]);
    }
  };

  useEffect(() => {
    if (query) {
      getSearches();
    } else {
      setSearches([]);
    }
  }, [query]);

  return (
    <div className="w-[80%] h-[8vh] relative flex justify-center m-auto items-center">
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-8 p-3 text-zinc-200 text-[17px] outline-none border-none"
        type="text"
        placeholder="Search anything..."
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-3xl text-zinc-400 ri-close-fill cursor-pointer"
        ></i>
      )}

      {searches.length > 0 && (
        <div className="absolute left-[20%] w-[50%] max-h-[57vh] bg-[#1f1e24] top-[100%] overflow-auto rounded-lg z-50 shadow-lg border border-gray-700">
          {searches.map((s, i) => (
            <Link
              key={i}
              to={`/${s.media_type}/details/${s.id}`}
              className="hover:bg-[#2d2b36] duration-300 font-semibold text-zinc-100 w-[100%] p-4 flex items-center border-b border-gray-600"
            >
              <img
                src={
                  s.profile_path || s.backdrop_path
                    ? `https://image.tmdb.org/t/p/w200${
                        s.profile_path || s.backdrop_path
                      }`
                    : no_image
                }
                alt=""
                className="w-[8vh] h-[8vh] object-cover mr-4 rounded shadow-md"
              />
              <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;
