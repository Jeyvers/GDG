import type { Tour } from '../types/tour'
import { TourCard } from './TourCard'

interface TourListProps {
  tours: Tour[]
  'aria-label'?: string
}

export function TourList({ tours, 'aria-label': ariaLabel }: TourListProps) {
  if (tours.length === 0) return null

  return (
    <ul className="tour-list" aria-label={ariaLabel}>
      {tours.map((tour) => (
        <li key={tour.id}>
          <TourCard tour={tour} />
        </li>
      ))}
    </ul>
  )
}
