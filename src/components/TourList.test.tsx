import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TourList } from './TourList'

const mockTours = [
  {
    id: '1',
    imageUrl: 'https://example.com/1.jpg',
    name: 'Tour One',
    description: 'First tour',
    date: '2025-06-01',
    creatorName: 'Alice',
  },
  {
    id: '2',
    imageUrl: 'https://example.com/2.jpg',
    name: 'Tour Two',
    description: 'Second tour',
    date: '2025-06-02',
    creatorName: 'Bob',
  },
]

describe('TourList', () => {
  it('renders nothing when tours array is empty', () => {
    const { container } = render(<TourList tours={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a list of tour cards', () => {
    render(<TourList tours={mockTours} />)
    expect(screen.getByRole('heading', { name: 'Tour One' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tour Two' })).toBeInTheDocument()
    expect(screen.getByText('First tour')).toBeInTheDocument()
    expect(screen.getByText('Second tour')).toBeInTheDocument()
  })

  it('renders list with optional aria-label', () => {
    render(<TourList tours={mockTours} aria-label="Tours list" />)
    const list = screen.getByRole('list', { name: 'Tours list' })
    expect(list).toBeInTheDocument()
  })
})
