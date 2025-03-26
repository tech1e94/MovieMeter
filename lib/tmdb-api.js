// The Movie Database API functions

// This is an access token, not an API key, so we need to use it in the Authorization header
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGU3YjYzNTMxYzY5M2I2NGU2MTI2OGVmMjA5MDI2MCIsIm5iZiI6MTc0Mjg0MjQxOS43ODMsInN1YiI6IjY3ZTFhYTMzZWJhNzlmNmZmN2YwNDUzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v2QoTqwU8hseHUwvx_KkxzVstbVQCPRscPqD829EigY"

const BASE_URL = "https://api.themoviedb.org/3"

// Request headers with authorization
const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "Content-Type": "application/json",
}

// Mock data for when API calls fail
const MOCK_MOVIES = [
  {
    id: 550,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    overview:
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    vote_average: 8.4,
    release_date: "1999-10-15",
    genre_ids: [18, 53, 35],
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    overview:
      "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    vote_average: 8.7,
    release_date: "1994-09-23",
    genre_ids: [18, 80],
  },
  {
    id: 238,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    vote_average: 8.7,
    release_date: "1972-03-14",
    genre_ids: [18, 80],
  },
  {
    id: 424,
    title: "Schindler's List",
    poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdrop_path: "/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg",
    overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis.",
    vote_average: 8.6,
    release_date: "1993-12-15",
    genre_ids: [18, 36, 10752],
  },
]

const MOCK_MOVIE_DETAILS = {
  id: 550,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  overview:
    "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
  vote_average: 8.4,
  release_date: "1999-10-15",
  runtime: 139,
  genres: [
    { id: 18, name: "Drama" },
    { id: 53, name: "Thriller" },
    { id: 35, name: "Comedy" },
  ],
}

const MOCK_REVIEWS = [
  {
    id: "5dc33e6b0f2ebd0018a93998",
    author: "SWITCH.",
    content: "If you haven't seen 'Fight Club', stop whatever you're doing and watch it now...",
    created_at: "2019-11-07T00:13:31.893Z",
    author_details: {
      name: "SWITCH.",
      username: "SWITCH.",
      avatar_path: null,
      rating: 9,
    },
  },
  {
    id: "5dc33e6b0f2ebd0018a93999",
    author: "MovieReviewer",
    content: "One of the most influential films of the 90s. A masterpiece of storytelling and visual style.",
    created_at: "2020-01-15T10:13:31.893Z",
    author_details: {
      name: "MovieReviewer",
      username: "MovieReviewer",
      avatar_path: null,
      rating: 10,
    },
  },
]

const MOCK_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
]

// Get now playing movies
export async function getNowPlayingMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching now playing movies:", error)
    // Return mock data as fallback
    return MOCK_MOVIES
  }
}

// Get top rated movies
export async function getTopRatedMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching top rated movies:", error)
    // Return mock data as fallback
    return MOCK_MOVIES
  }
}

// Get upcoming movies
export async function getUpcomingMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching upcoming movies:", error)
    // Return mock data as fallback
    return MOCK_MOVIES
  }
}

// Get movie details
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US&append_to_response=credits`, {
      headers,
      next: { revalidate: 86400 }, // Revalidate every day
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error)
    // Return mock data as fallback
    return MOCK_MOVIE_DETAILS
  }
}

// Get movie reviews
export async function getMovieReviews(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`, {
      headers,
      next: { revalidate: 86400 }, // Revalidate every day
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error)
    // Return mock data as fallback
    return MOCK_REVIEWS
  }
}

// Get all genres
export async function getGenres() {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
      headers,
      next: { revalidate: 604800 }, // Revalidate every week
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.genres
  } catch (error) {
    console.error("Error fetching genres:", error)
    // Return mock data as fallback
    return MOCK_GENRES
  }
}

// Get movies by genre
export async function getMoviesByGenre(genreId) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
      {
        headers,
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(`Error fetching movies by genre ID ${genreId}:`, error)
    // Return mock data as fallback
    return MOCK_MOVIES
  }
}

// Search movies
export async function searchMovies(query) {
  if (!query) return []

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
      {
        headers,
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error searching movies:", error)
    // Return filtered mock data as fallback
    return MOCK_MOVIES.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
  }
}

