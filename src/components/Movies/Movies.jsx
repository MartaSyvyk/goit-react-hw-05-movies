import * as API from '../../API/API';
import { useEffect, useState } from 'react';
import { Searchbox } from 'components/Searchbox/Searchbox';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { LoadMore } from 'components/LoadMore/LoadMore';

import css from '../Movies/Movies.module.css'

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('search') ?? '';
  const curPage = searchParams.get('page') ?? 1;
  const [query, setQuery] = useState(filter);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(Number(curPage));
  const location = useLocation();

  // const curMovies = useMemo((() => {return movies}), [query, page])

  // useEffect((() => {
  //     if (curMovies.length !== 0) {
  //     setMovies(curMovies)
  //     console.log(curMovies)

  // }}), [])

  useEffect(() => {
    console.log(filter);

    async function fetchData() {
      //   const response = await API.fetchSearchingFilms(query, page);

      //   if (!response){
      //     alert('bad request');
      //     return
      //   }
      //   console.log(response)

      //   setMovies([...movies, ...response])

      API.fetchSearchingFilms(query, page)
        .then(response => {setError(null);
          setMovies([...movies, ...response]);
          
        })
        .catch(error => {
          console.log('catch!!!');
          setError(`Nothing was found on your request ${query}`);
        });
    }

    if (!query) {
      return;
    }

    fetchData();
    setSearchParams({ search: query, page: page });
    console.log(location);
  }, [query, page]);

  const submitHandler = event => {
    event.preventDefault();

    if (!event.currentTarget.elements[0].value) {
      alert('empty');
      return;
    }
    if (event.currentTarget.elements[0].value === query) {
      return;
    }

    setMovies([]);

    setPage(1);

    // async function fetchData() {

    //   const response = await API.fetchSearchingFilms(query, 1);
    //   console.log(response)
    //   setMovies(response)
    // }
    // fetchData();

    setQuery(event.currentTarget.elements[0].value);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // const changeHandler = (event) =>{
  //     setQuery(event.currentTarget.value)
  // }

  return (
    <div
      className={css.container}
    >
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
