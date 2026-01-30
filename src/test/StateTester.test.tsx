import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StateTester } from '../components/StateTester'
import { MockQueryState } from '../api/mockTours'

describe('StateTester', () => {
  const onSetState = vi.fn()
  const onRefetch = vi.fn()

  beforeEach(() => {
    onSetState.mockClear()
    onRefetch.mockClear()
  })

  it('renders test state buttons with accessible group', () => {
    render(
      <StateTester
        currentState={MockQueryState.SUCCESS}
        onSetState={onSetState}
        onRefetch={onRefetch}
      />
    )
    expect(screen.getByRole('group', { name: /simulate api state/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /simulate loading/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /simulate error/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /simulate empty/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /simulate success/i })).toBeInTheDocument()
  })

  it('calls onSetState and onRefetch when a state button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <StateTester
        currentState={MockQueryState.SUCCESS}
        onSetState={onSetState}
        onRefetch={onRefetch}
      />
    )
    await user.click(screen.getByRole('button', { name: /simulate error/i }))
    expect(onSetState).toHaveBeenCalledWith(MockQueryState.ERROR)
    expect(onRefetch).toHaveBeenCalledTimes(1)
  })

  it('marks active button with aria-pressed', () => {
    render(
      <StateTester
        currentState={MockQueryState.EMPTY}
        onSetState={onSetState}
        onRefetch={onRefetch}
      />
    )
    const emptyButton = screen.getByRole('button', { name: /simulate empty/i })
    expect(emptyButton).toHaveAttribute('aria-pressed', 'true')
  })
})
