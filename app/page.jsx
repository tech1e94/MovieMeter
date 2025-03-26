import MovieList from "@/components/movie-list"
import { Suspense } from "react"
import Loading from "./loading"
import { getGenres } from "@/lib/tmdb-api"
import GenreFilter from "@/components/genre-filter"

export default async function Home() {
  const genres = await getGenres()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Now Playing Movies</h1>
        <GenreFilter genres={genres} />
      </div>

      <Suspense fallback={<Loading />}>
        <MovieList />
      </Suspense>
    </main>
  )
}

