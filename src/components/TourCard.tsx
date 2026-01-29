import type { Tour } from '../types/tour'

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="tour-card">
      <img src={tour.imageUrl} alt={tour.name} className="tour-card__image" />
      <div className="tour-card__body">
        <h2 className="tour-card__name">{tour.name}</h2>
        <p className="tour-card__description">{tour.description}</p>
        <p className="tour-card__meta">
          <span className="tour-card__date">{tour.date}</span>
          <span className="tour-card__creator">by {tour.creatorName}</span>
        </p>
      </div>
    </article>
  )
}
