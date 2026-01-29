import { describe, it, expect, vi } from 'vitest'
import { render, screen, userEvent } from '@testing-library/react'
import { AddTourForm } from './AddTourForm'

describe('AddTourForm', () => {
  const onCancel = vi.fn()
  const onSubmit = vi.fn()

  beforeEach(() => {
    onCancel.mockClear()
    onSubmit.mockClear()
  })

  it('renders dialog with title and all form fields', () => {
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    expect(screen.getByRole('dialog', { name: 'Add Tour' })).toBeInTheDocument()
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^date$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/creator name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Tour' })).toBeInTheDocument()
  })

  it('calls onCancel when Cancel is clicked', async () => {
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when form is submitted', async () => {
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    await userEvent.type(screen.getByLabelText(/image url/i), 'https://example.com/img.jpg')
    await userEvent.type(screen.getByLabelText(/^name$/i), 'My Tour')
    await userEvent.type(screen.getByLabelText(/description/i), 'A great tour')
    await userEvent.type(screen.getByLabelText(/^date$/i), '2025-07-01')
    await userEvent.type(screen.getByLabelText(/creator name/i), 'John Doe')
    await userEvent.click(screen.getByRole('button', { name: 'Add Tour' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      imageUrl: 'https://example.com/img.jpg',
      name: 'My Tour',
      description: 'A great tour',
      date: '2025-07-01',
      creatorName: 'John Doe',
    })
  })

  it('has accessible modal attributes', () => {
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby')
  })

  it('calls onCancel when Escape is pressed', async () => {
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    await userEvent.keyboard('{Escape}')
    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
