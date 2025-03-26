import { getMovieReviews } from "@/lib/tmdb-api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export default async function MovieReviews({ movieId }) {
  const reviews = await getMovieReviews(movieId)

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">No reviews yet. Be the first to review this movie!</div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage
                src={
                  review.author_details?.avatar_path
                    ? `https://image.tmdb.org/t/p/w100${review.author_details.avatar_path}`
                    : null
                }
                alt={review.author}
              />
              <AvatarFallback>{review.author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{review.author}</h4>
                {review.author_details?.rating && (
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm">{review.author_details.rating}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-1">{new Date(review.created_at).toLocaleDateString()}</p>

              <div className="mt-2 text-sm">
                {review.content.length > 300 ? `${review.content.substring(0, 300)}...` : review.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

