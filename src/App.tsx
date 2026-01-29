import { useState, useEffect, useCallback } from 'react'
import { TourList } from './components/TourList'
import { AddTourForm } from './components/AddTourForm'
import { StateTester } from './components/StateTester'
import {
  fetchTours,
  addTour as addTourApi,
  setMockQueryState,
  getMockQueryState,
} from './api/mockTours'
import type { Tour } from './types/tour'
import type { AddTourInput } from './types/tour'
import './App.css'

function App() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const loadTours = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTours()
      setTours(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setTours([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTours()
  }, [loadTours])

  const handleAddTour = (input: AddTourInput) => {
    addTourApi(input)
    setShowAddForm(false)
    loadTours()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tours</h1>
        <StateTester
          currentState={getMockQueryState()}
          onSetState={setMockQueryState}
          onRefetch={loadTours}
        />
        <button
          type="button"
          className="add-tour-btn"
          onClick={() => setShowAddForm(true)}
          aria-label="Add a new tour"
        >
          Add Tour
        </button>
      </header>

      <main className="app-main" aria-label="Tours content">
        {loading && (
          <div
            className="state-message state-message--loading"
            aria-busy="true"
            aria-live="polite"
            role="status"
            aria-label="Loading tours"
          >
            <div className="spinner" aria-hidden="true" />
            <p>Loading tours...</p>
          </div>
        )}

        {!loading && error && (
          <div
            className="state-message state-message--error"
            role="alert"
            aria-live="assertive"
            aria-label="Error loading tours"
          >
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && tours.length === 0 && (
          <div
            className="state-message state-message--empty"
            role="status"
            aria-live="polite"
            aria-label="No tours"
          >
            <p>No tours yet. Add one to get started.</p>
          </div>
        )}

        {!loading && !error && tours.length > 0 && (
          <TourList tours={tours} aria-label="Tours list" />
        )}
      </main>

      {showAddForm && (
        <AddTourForm onSubmit={handleAddTour} onCancel={() => setShowAddForm(false)} />
      )}
    </div>
  )
}

export default App
