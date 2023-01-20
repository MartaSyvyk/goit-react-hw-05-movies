const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTrendingFilms(page) {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    const result = await response.json();
    if (result.results.length === 0) {
      return Promise.reject();
    }

    return result.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSearchingFilms(searchQuery, page) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
    );
    const result = await response.json();
    if (result.results.length === 0) {
      return Promise.reject();
    }

    return result.results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFilmsById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCast(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    const result = await response.json();

    if (result.length === 0) {
      return Promise.reject();
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchReviews(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
    );
    const result = await response.json();

    if (result.length === 0) {
      return Promise.reject();
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}
