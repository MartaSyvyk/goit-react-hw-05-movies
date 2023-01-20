import * as API from '../../API/API';
import { useParams, Link,  Outlet, useNavigate, useLocation   } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { Suspense } from 'react';
import css from '../MovieDetails/MovieDetails.module.css'




const MovieDetails =() => {
     const [movie, setMovie] = useState('');
     const {movieId} = useParams();
    // const navigate = useNavigate();
    const location = useLocation();
    const loc = useMemo((() => {return location.state?.from?? '///'}),[movie]) ;

   
    useEffect(() => 
    {
        async function fetchData() {
          
          const response = await  API.fetchFilmsById(movieId);
                    setMovie(response);
                   
        }
        fetchData();
       
      }, []);

    console.log(loc)


   const {poster_path, original_title, release_date, vote_average, overview, genres } = movie;
  //  let allGenres = (genres.map(genre => {return genre.name})).join(', ')


const url = `https://image.tmdb.org/t/p/w342${poster_path}`

    return <div className={css.container} > <Suspense fallback={null}>
        <Link to={loc} className={css.link_back} > Go back </Link>
      {movie !== '' &&  <div className={css.info_container}> <img src={url} alt="" className={css.image} /> <div className={css.details_container}>
      <h1 className={css.h1}>{original_title} ({release_date.substring(0, 4)})</h1> 
      <p className={css.p}>User Score: {vote_average * 10} %</p>
      <h2>Overview</h2>
      <p className={css.p}>{overview }</p>
      <h3>Genres</h3>
      <p className={css.p}>{(genres.map(genre => {return genre.name})).join(', ')}</p>
</div></div>}
    <div className={css.outlet_container}> 
    
    <Link to='cast' className={css.outlet_link}>Cast</Link>
    
      <Link to='reviews' className={css.outlet_link}>Reviews</Link></div>
      
      <Suspense fallback={ <div>Cast reviews fallback</div> }>
<Outlet/> </Suspense>
  </Suspense>  </div>
}

export default MovieDetails