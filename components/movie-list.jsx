import { getNowPlayingMovies } from "@/lib/tmdb-api"
import MovieCard from "./movie-card"

export default async function MovieList() {
  const movies = await getNowPlayingMovies()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

