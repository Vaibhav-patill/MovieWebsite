import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";

const Details = () => {
  const { media_type, id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  // Fetch Movie/TV Show Details
  const fetchDetails = async () => {
    try {
      const { data } = await axios.get(`/${media_type}/${id}?append_to_response=credits,videos`);
      setDetails(data);

      // Fetch Trailer (Get the first available trailer)
      const trailer = data.videos?.results.find((vid) => vid.type === "Trailer");
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!details) return <p className="text-center text-white mt-10"><Loading/></p>;

  return (
    <div className="w-[90%] md:w-[80%] mx-auto p-5 text-white overflow-auto">
      
      {/* BACK BUTTON */}
      <button onClick={() => navigate(-1)} className="bg-gray-800 px-4 py-2 rounded-md mb-5 hover:bg-gray-700 transition">
        ⬅ Back
      </button>

      {/* BACKGROUND BANNER */}
      <div
        className="w-full h-[50vh] bg-cover bg-center flex items-end p-6 rounded-lg shadow-lg"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
        }}
      >
        <h1 className="text-5xl font-bold">{details.title || details.name}</h1>
      </div>

      {/* TRAILER SECTION */}
      {trailerKey && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">🎬 Watch Trailer</h2>
          <iframe
            className="w-full h-[500px] rounded-lg shadow-md"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* MOVIE DETAILS */}
      <div className="mt-8 flex flex-col md:flex-row gap-10 bg-gray-900 p-6 rounded-lg shadow-lg">
        
        {/* POSTER IMAGE */}
        <img
          className="w-[300px] rounded-lg shadow-md"
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title || details.name}
        />

        {/* INFORMATION */}
        <div className="flex-1">
          <p className="text-lg text-gray-300">{details.overview}</p>

          <div className="mt-5 space-y-3 text-lg">
            <p><strong>🎭 Genres:</strong> {details.genres.map(g => g.name).join(", ")}</p>
            <p><strong>📅 Release Date:</strong> {details.release_date || details.first_air_date}</p>
            <p><strong>⏳ Runtime:</strong> {details.runtime ? `${details.runtime} mins` : "N/A"}</p>
            <p><strong>⭐ Rating:</strong> {details.vote_average.toFixed(1)} / 10</p>
            <p><strong>📺 Media Type:</strong> {media_type.toUpperCase()}</p>
          </div>

          {/* DIRECTOR */}
          <div className="mt-5 flex items-center">
            <h2 className="text-xl font-semibold">🎬 Director:</h2>
            {details.credits?.crew
              .filter(person => person.job === "Director")
              .map((director) => (
                <p key={director.id} className="ml-3 mt-0.5 text-gray-300 text-xl">{director.name}</p>
              ))}
          </div>
        </div>
      </div>

      {/* CAST SECTION */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">🎭 Top Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {details.credits?.cast.slice(0, 5).map((actor) => (
            <div key={actor.id} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md">
              <img
                className="w-[100px] h-[100px] rounded-full object-cover mb-3 border-2 border-gray-700"
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p className="text-lg font-semibold">{actor.name}</p>
              <p className="text-sm text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
