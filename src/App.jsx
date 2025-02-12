import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import People from './components/People';
import MovieDetails from './components/MovieDetails';
import PeopleDetails from './components/PeopleDetails';
import TvDetails from './components/TvDetails';
import Trailer from './components/templates/Trailer';
import NotFound from './components/NotFound';

const App = () => {

  return (
    <div className='bg-[#1F1E24] w-screen h-screen flex'>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/trending" element={ <Trending /> } />
        <Route path="/popular" element={ <Popular /> } />

        <Route path="/movie" element={ <Movies /> } />
        <Route path="/movie/details/:id" element={ <MovieDetails /> }>
          <Route path="/movie/details/:id/trailer" element={ <Trailer /> } />
        </Route>

        <Route path="/tv" element={ <TVShows /> } />
        <Route path="/tv/details/:id" element={ <TvDetails /> } >
          <Route path="/tv/details/:id/trailer" element={ <Trailer />} />
        </Route>

        <Route path="/person" element={ <People /> } />
        <Route path="/person/details/:id" element={ <PeopleDetails /> } />

        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  )
}

export default App;
