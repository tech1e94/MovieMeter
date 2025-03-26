import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { StarIcon } from "lucide-react"

export default function MovieCard({ movie }) {
  // Handle case where poster_path might be null
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-[2/3] relative">
          <Image
            src={posterPath || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

