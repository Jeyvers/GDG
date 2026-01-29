export interface Tour {
  id: string
  imageUrl: string
  name: string
  description: string
  date: string
  creatorName: string
}

export interface AddTourInput {
  imageUrl: string
  name: string
  description: string
  date: string
  creatorName: string
}
