import * as API from '../../API/API';
import { useEffect, useState } from 'react';
import { Searchbox } from 'components/Searchbox/Searchbox';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { LoadMore } from 'components/LoadMore/LoadMore';
import css from '../Movies/Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('search') ?? '';
  const curPage = searchParams.get('page') ?? 1;
  const [query, setQuery] = useState(filter);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(Number(curPage));
  const location = useLocation();

  useEffect(() => {
  

    async function fetchData() {
      API.fetchSearchingFilms(query, page)
        .then(response => {
          setError(null);
          setMovies(prevMovies => [...prevMovies, ...response]);
        })
        .catch(error => {
          setError(`Nothing was found on your request ${query}`);
        });
    }

    if (!query) {
      return;
    }

    fetchData();
    setSearchParams({ search: query, page: page });
    
  }, [query, page, setSearchParams]);

  const submitHandler = event => {
    event.preventDefault();

    if (!event.currentTarget.elements[0].value) {
      alert('Empty searchbar');
      return;
    }
    if (event.currentTarget.elements[0].value === query) {
      return;
    }

    setMovies([]);

    setPage(1);

    setQuery(event.currentTarget.elements[0].value);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.container}>
      {' '}
      <Searchbox onSubmit={submitHandler} />
      {movies.length !== 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {error && <div>{error}</div>}
      {movies.length !== 0 && <LoadMore onClick={handleLoadMore} />}
    </div>
  );
};

export default Movies;
