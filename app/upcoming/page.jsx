import { getUpcomingMovies } from "@/lib/tmdb-api"
import { Suspense } from "react"
import Loading from "@/app/loading"
import MovieCard from "@/components/movie-card"

export const metadata = {
  title: "Upcoming Movies | MovieMeter",
  description: "Discover movies coming soon to theaters",
}

export default async function UpcomingPage() {
  const movies = await getUpcomingMovies()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Movies</h1>

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

