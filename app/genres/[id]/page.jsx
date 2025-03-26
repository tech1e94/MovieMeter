import { getMoviesByGenre, getGenres } from "@/lib/tmdb-api"
import { Suspense } from "react"
import Loading from "@/app/loading"
import MovieCard from "@/components/movie-card"

export async function generateMetadata({ params }) {
  const genres = await getGenres()
  const genre = genres.find((g) => g.id.toString() === params.id)

  return {
    title: `${genre?.name || "Genre"} Movies | Movie Review Website`,
    description: `Browse ${genre?.name || "genre"} movies`,
  }
}

export default async function GenrePage({ params }) {
  const genreId = params.id
  const [movies, genres] = await Promise.all([getMoviesByGenre(genreId), getGenres()])

  const genre = genres.find((g) => g.id.toString() === genreId)
  const genreName = genre?.name || "Genre"

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{genreName} Movies</h1>

      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </Suspense>
    </main>
  )
}

