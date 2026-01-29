import type { Tour } from '../types/tour'
import { TourCard } from './TourCard'

interface TourListProps {
  tours: Tour[]
}

export function TourList({ tours }: TourListProps) {
  if (tours.length === 0) return null

  return (
    <ul className="tour-list">
      {tours.map((tour) => (
        <li key={tour.id}>
          <TourCard tour={tour} />
        </li>
      ))}
    </ul>
  )
}
