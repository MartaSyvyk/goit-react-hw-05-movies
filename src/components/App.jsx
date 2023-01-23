import Layout from './Layout/Layout';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { lazy } from 'react';

const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        width: '100vw',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="movies" element={<Movies />} />

          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route
            path="*"
            element={
              <div>
                {' '}
                Page not found <br /> <Link to="/">Home</Link>{' '}
              </div>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
