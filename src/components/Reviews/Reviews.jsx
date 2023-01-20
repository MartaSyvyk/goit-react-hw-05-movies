import * as API from '../../API/API';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from '../Reviews/Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState('');
  useEffect(() => {
    async function fetchData() {
      const response = await API.fetchReviews(movieId);
      setReviews(response.results);
    }
    fetchData();
  }, []);

  if (!reviews || reviews.length === 0) {
    return (
      <div className={css.container}>
        We don`t have any review for this movie
      </div>
    );
  }
  return (
    <div className={css.container}>
      {reviews.map(review => (
        <li key={review.id} className={css.li}>
          Author: {review.author}
          <p className={css.p}>{review.content}</p>
        </li>
      ))}
    </div>
  );
};
export default Reviews;
