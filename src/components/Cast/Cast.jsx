import * as API from '../../API/API';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from '../Cast/Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState('');
  useEffect(() => {
    async function fetchData() {
      const response = await API.fetchCast(movieId);
      setCast(response.cast);
      console.log(response.cast);
    }
    fetchData();
  }, []);

  if (!cast || cast.length === 0) {
    return <div className={css.container}>No cast info </div>;
  }
  return (
    <div className={css.container}>
      {' '}
      <ul className={css.list}>
        {cast.map(elem => (
          <li key={elem.id}>
            {' '}
            <div className={css.item_container}>
              <img
                src={`https://image.tmdb.org/t/p/w185${elem.profile_path}`}
                alt=""
                width="185px"
              />{' '}
              {elem.original_name}{' '}
              <p className={css.p}>Character: {elem.character}</p>
            </div>
          </li>
        ))}{' '}
      </ul>{' '}
    </div>
  );
};
export default Cast;
