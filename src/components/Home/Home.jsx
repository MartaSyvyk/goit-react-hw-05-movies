import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { LoadMore } from 'components/LoadMore/LoadMore';
import * as API from '../../API/API';
import css from '../Home/Home.module.css'

const Home = () => {
const location = useLocation ();
 const [searchParams, setSearchParams] = useSearchParams(); 
const curPage = searchParams.get('page') ?? 1;
const [page, setPage] = useState(Number(curPage));

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

 
      useEffect(() => 
    {   

    async function fetchData() {
        //   const response = await API.fetchSearchingFilms(query, page);
  
        //   if (!response){
        //     alert('bad request');
        //     return
        //   }
        //   console.log(response)
  
        //   setMovies([...movies, ...response])
 
         API.fetchTrendingFilms( page)
          .then(response => {
            setMovies([...movies, ...response]);
            setError(null);
          })
          .catch(error => {
            console.log('catch!!!');
            setError(`No more movies`);
          });
      }
  
      
  
      fetchData();



    
  
    //     async function fetchData() {
          
    //       const response = await API.fetchTrendingFilms(page);
    //       console.log(response)
    //        setMovies([...movies, ...response])
    //     }
    //     fetchData();
         setSearchParams({page: page});
      }, [page]);
const handleLoadMore = () => {
    setPage(page + 1);


}
return (<div
    className={css.container}> 
    <h1  className={css.h1}>Trending today</h1>
<ul>
    {movies.map(movie => (<li key={movie.id}><Link to={`/movies/${movie.id}`} state ={{from: location}}>{movie.title}</Link></li>))}
    
    
</ul>
{error && <div>{error}</div>}
{movies.length !== 0 && !error && <LoadMore onClick={handleLoadMore}/>}</div>)
}

export default Home