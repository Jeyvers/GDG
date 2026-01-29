import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  fetchTours,
  addTour,
  setMockQueryState,
  getMockQueryState,
  MockQueryState,
} from './mockTours'

describe('mockTours', () => {
  beforeEach(() => {
    setMockQueryState(MockQueryState.SUCCESS)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('fetchTours', () => {
    it('returns an array of tours on success', async () => {
      const promise = fetchTours()
      await vi.advanceTimersByTimeAsync(800)
      const result = await promise
      expect(result).toHaveLength(5)
      result.forEach((tour) => {
        expect(tour).toHaveProperty('id')
        expect(tour).toHaveProperty('imageUrl')
        expect(tour).toHaveProperty('name')
        expect(tour).toHaveProperty('description')
        expect(tour).toHaveProperty('date')
        expect(tour).toHaveProperty('creatorName')
        expect(typeof tour.name).toBe('string')
        expect(typeof tour.description).toBe('string')
      })
    })

    it('throws on error state', async () => {
      setMockQueryState(MockQueryState.ERROR)
      const promise = fetchTours()
      await vi.advanceTimersByTimeAsync(800)
      await expect(promise).rejects.toThrow('Failed to load tours')
    })

    it('returns empty array on empty state', async () => {
      setMockQueryState(MockQueryState.EMPTY)
      const promise = fetchTours()
      await vi.advanceTimersByTimeAsync(800)
      const result = await promise
      expect(result).toEqual([])
    })

    it('delays then returns data on loading state', async () => {
      setMockQueryState(MockQueryState.LOADING)
      const promise = fetchTours()
      await vi.advanceTimersByTimeAsync(800)
      expect(await Promise.race([promise, Promise.resolve('pending')])).toBe('pending')
      await vi.advanceTimersByTimeAsync(2500)
      const result = await promise
      expect(result.length).toBeGreaterThan(0)
    })
  })

  describe('setMockQueryState / getMockQueryState', () => {
    it('sets and returns the forced state', () => {
      expect(getMockQueryState()).toBe(MockQueryState.SUCCESS)
      setMockQueryState(MockQueryState.ERROR)
      expect(getMockQueryState()).toBe(MockQueryState.ERROR)
      setMockQueryState(MockQueryState.EMPTY)
      expect(getMockQueryState()).toBe(MockQueryState.EMPTY)
    })
  })

  describe('addTour', () => {
    it('adds a tour and returns it with an id', () => {
      const input = {
        imageUrl: 'https://example.com/img.jpg',
        name: 'Test Tour',
        description: 'A test',
        date: '2025-06-01',
        creatorName: 'Jane Doe',
      }
      const added = addTour(input)
      expect(added.id).toBeDefined()
      expect(added.imageUrl).toBe(input.imageUrl)
      expect(added.name).toBe(input.name)
      expect(added.description).toBe(input.description)
      expect(added.date).toBe(input.date)
      expect(added.creatorName).toBe(input.creatorName)
    })

    it('prepends new tour so it appears in fetchTours', async () => {
      const input = {
        imageUrl: 'https://example.com/new.jpg',
        name: 'New Tour',
        description: 'New desc',
        date: '2025-07-01',
        creatorName: 'New Creator',
      }
      addTour(input)
      const promise = fetchTours()
      await vi.advanceTimersByTimeAsync(800)
      const tours = await promise
      const first = tours[0]
      expect(first.name).toBe('New Tour')
      expect(first.creatorName).toBe('New Creator')
    })
  })
})
