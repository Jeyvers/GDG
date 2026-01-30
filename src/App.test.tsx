import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { act } from 'react'
import App from './App'
import { setMockQueryState, MockQueryState } from './api/mockTours'

describe('App', () => {
  beforeEach(() => {
    setMockQueryState(MockQueryState.SUCCESS)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders header with title and Add Tour button', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Tours' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add a new tour/i })).toBeInTheDocument()
  })

  it('shows loading state then tours list', async () => {
    render(<App />)
    expect(screen.getByRole('status', { name: /loading tours/i })).toBeInTheDocument()
    expect(screen.getByText(/loading tours/i)).toBeInTheDocument()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800)
    })
    expect(screen.queryByRole('status', { name: /loading tours/i })).not.toBeInTheDocument()
    const list = screen.getByRole('list', { name: /tours list/i })
    expect(list).toBeInTheDocument()
    expect(within(list).getAllByRole('listitem').length).toBeGreaterThan(0)
  })

  it('shows error state when fetch fails', async () => {
    setMockQueryState(MockQueryState.ERROR)
    render(<App />)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800)
    })
    expect(screen.getByRole('alert', { name: /error loading tours/i })).toBeInTheDocument()
    expect(screen.getByText(/failed to load tours/i)).toBeInTheDocument()
  })

  it('shows empty state when no tours', async () => {
    setMockQueryState(MockQueryState.EMPTY)
    render(<App />)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800)
    })
    expect(screen.getByRole('status', { name: /no tours/i })).toBeInTheDocument()
    expect(screen.getByText(/no tours yet/i)).toBeInTheDocument()
  })

  it('opens Add Tour dialog when Add Tour is clicked', async () => {
    render(<App />)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(800)
    })
    fireEvent.click(screen.getByRole('button', { name: /add a new tour/i }))
    expect(screen.getByRole('dialog', { name: 'Add Tour' })).toBeInTheDocument()
  })
})
