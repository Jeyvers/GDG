import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TourCard } from '../components/TourCard'

const mockTour = {
  id: '1',
  imageUrl: 'https://example.com/tour.jpg',
  name: 'Paris Tour',
  description: 'A wonderful tour of Paris.',
  date: '2025-06-15',
  creatorName: 'Jane Doe',
}

describe('TourCard', () => {
  it('renders tour name, description, date, and creator', () => {
    render(<TourCard tour={mockTour} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Paris Tour' })).toBeInTheDocument()
    expect(screen.getByText('A wonderful tour of Paris.')).toBeInTheDocument()
    expect(screen.getByText('2025-06-15')).toBeInTheDocument()
    expect(screen.getByText(/by Jane Doe/)).toBeInTheDocument()
  })

  it('renders image with correct alt text', () => {
    render(<TourCard tour={mockTour} />)
    const img = screen.getByRole('img', { name: 'Paris Tour' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/tour.jpg')
  })

  it('uses article semantics', () => {
    const { container } = render(<TourCard tour={mockTour} />)
    const article = container.querySelector('article.tour-card')
    expect(article).toBeInTheDocument()
  })
})
