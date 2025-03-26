import { getMovieDetails } from "@/lib/tmdb-api"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import MovieReviews from "@/components/movie-reviews"
import { Suspense } from "react"
import Loading from "@/app/loading"

export default async function MoviePage({ params }) {
  const movie = await getMovieDetails(params.id)

  // Handle case where poster_path might be null
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <Image
            src={posterPath || "/placeholder.svg"}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</span>
            {movie.runtime > 0 && (
              <>
                <span>•</span>
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres &&
              movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-muted-foreground">{movie.overview}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <Suspense fallback={<Loading />}>
              <MovieReviews movieId={params.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

