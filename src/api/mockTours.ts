import { faker } from '@faker-js/faker'
import { type Tour } from '../types/tour'

 export enum MockQueryState {
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  EMPTY = 'EMPTY',
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function generateMockTours(count: number): Tour[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    imageUrl: faker.image.url({ width: 400, height: 300 }),
    name: faker.location.city() + ' Tour',
    description: faker.lorem.paragraph(),
    date: faker.date.future().toISOString().split('T')[0],
    creatorName: faker.person.fullName(),
  }))
}

let mockTours: Tour[] = generateMockTours(5)
let forcedState: MockQueryState = MockQueryState.SUCCESS

export function setMockQueryState(state: MockQueryState) {
  forcedState = state
}

export async function fetchTours(): Promise<Tour[]> {
  await delay(800)

    if (forcedState === MockQueryState.LOADING) {
    await delay(2500) // show loading for 2.5s then return data
  }

  if (forcedState === MockQueryState.ERROR) {
    throw new Error('Failed to load tours. Please try again later.')
  }

    if (forcedState === MockQueryState.EMPTY) {
    return []
  }

  return [...mockTours]
}

export function addTour(tour: Omit<Tour, 'id'>): Tour {
  const newTour: Tour = {
    ...tour,
    id: faker.string.uuid(),
  }
  mockTours = [newTour, ...mockTours]
  return newTour
}

export function   getMockQueryState(): MockQueryState {
  return forcedState
}
