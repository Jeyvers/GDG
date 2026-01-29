import { useState, useEffect, useRef } from 'react'
import type { AddTourInput } from '../types/tour'

interface AddTourFormProps {
  onSubmit: (data: AddTourInput) => void
  onCancel: () => void
}

const DIALOG_TITLE_ID = 'add-tour-dialog-title'

export function AddTourForm({ onSubmit, onCancel }: AddTourFormProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [creatorName, setCreatorName] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ imageUrl, name, description, date, creatorName })
  }

  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement | null
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
      'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus({ preventScroll: true })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousActiveElement.current?.focus({ preventScroll: true })
    }
  }, [onCancel])

  return (
    <div
      className="add-tour-overlay"
      onClick={onCancel}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="add-tour-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={DIALOG_TITLE_ID}
        aria-describedby="add-tour-dialog-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={DIALOG_TITLE_ID}>Add Tour</h2>
        <p id="add-tour-dialog-desc" className="sr-only">
          Fill in the details to add a new tour.
        </p>
        <form onSubmit={handleSubmit} className="add-tour-form">
          <label htmlFor="add-tour-image-url">
            Image URL
            <input
              id="add-tour-image-url"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              required
              autoComplete="url"
            />
          </label>
          <label htmlFor="add-tour-name">
            Name
            <input
              id="add-tour-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tour name"
              required
              autoComplete="off"
            />
          </label>
          <label htmlFor="add-tour-description">
            Description
            <textarea
              id="add-tour-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the tour..."
              rows={3}
              required
            />
          </label>
          <label htmlFor="add-tour-date">
            Date
            <input
              id="add-tour-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label htmlFor="add-tour-creator">
            Creator name
            <input
              id="add-tour-creator"
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </label>
          <div className="add-tour-actions">
            <button type="button" onClick={onCancel} aria-label="Cancel and close dialog">
              Cancel
            </button>
            <button type="submit">Add Tour</button>
          </div>
        </form>
      </div>
    </div>
  )
}
