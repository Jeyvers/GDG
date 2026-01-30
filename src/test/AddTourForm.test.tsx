import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTourForm } from '../components/AddTourForm'

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
    const user = userEvent.setup()
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    await user.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when form is submitted', async () => {
    const user = userEvent.setup()
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    await user.type(screen.getByLabelText(/image url/i), 'https://example.com/img.jpg')
    await user.type(screen.getByLabelText(/^name$/i), 'My Tour')
    await user.type(screen.getByLabelText(/description/i), 'A great tour')
    await user.type(screen.getByLabelText(/^date$/i), '2025-07-01')
    await user.type(screen.getByLabelText(/creator name/i), 'John Doe')
    await user.click(screen.getByRole('button', { name: 'Add Tour' }))
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
    const user = userEvent.setup()
    render(<AddTourForm onSubmit={onSubmit} onCancel={onCancel} />)
    await user.keyboard('{Escape}')
    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
