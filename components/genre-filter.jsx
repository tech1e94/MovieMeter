"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function GenreFilter({ genres }) {
  const [open, setOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const router = useRouter()

  const handleSelect = (genreId) => {
    setSelectedGenre(genreId)
    setOpen(false)

    if (genreId) {
      router.push(`/genres/${genreId}`)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full md:w-[200px] justify-between">
          {selectedGenre ? genres.find((genre) => genre.id.toString() === selectedGenre)?.name : "Filter by Genre"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search genre..." />
          <CommandList>
            <CommandEmpty>No genre found.</CommandEmpty>
            <CommandGroup>
              {genres.map((genre) => (
                <CommandItem key={genre.id} value={genre.name} onSelect={() => handleSelect(genre.id.toString())}>
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedGenre === genre.id.toString() ? "opacity-100" : "opacity-0")}
                  />
                  {genre.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

