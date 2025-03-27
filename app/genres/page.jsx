import { getGenres } from "@/lib/tmdb-api"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Film } from "lucide-react"

export const metadata = {
  title: "Movie Genres | MovieMeter",
  description: "Browse movies by genre",
}

export default async function GenresPage() {
  const genres = await getGenres()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse by Genre</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genres/${genre.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-3">
                <Film className="h-5 w-5 text-primary" />
                <span className="font-medium">{genre.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}

