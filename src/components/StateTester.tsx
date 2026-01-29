import { MockQueryState } from '../api/mockTours'

interface StateTesterProps {
  currentState: MockQueryState
  onSetState: (state: MockQueryState) => void
  onRefetch: () => void
}

export function StateTester({ currentState, onSetState, onRefetch }: StateTesterProps) {
  const trigger = (state: MockQueryState) => {
    onSetState(state)
    onRefetch()
  }

  return (
    <div className="state-tester" role="group" aria-label="Simulate API state for testing">
      <span className="state-tester__label" id="state-tester-label">Test states:</span>
      <div className="state-tester__buttons" aria-labelledby="state-tester-label">
        <button
          type="button"
          onClick={() => trigger(MockQueryState.LOADING)}
          className={currentState === MockQueryState.LOADING ? 'active' : undefined}
          aria-pressed={currentState === MockQueryState.LOADING}
          aria-label="Simulate loading state"
        >
          Loading
        </button>
        <button
          type="button"
          onClick={() => trigger(MockQueryState.ERROR)}
          className={currentState === MockQueryState.ERROR ? 'active' : undefined}
          aria-pressed={currentState === MockQueryState.ERROR}
          aria-label="Simulate error state"
        >
          Error
        </button>
        <button
          type="button"
          onClick={() => trigger(MockQueryState.EMPTY)}
          className={currentState === MockQueryState.EMPTY ? 'active' : undefined}
          aria-pressed={currentState === MockQueryState.EMPTY}
          aria-label="Simulate empty state"
        >
          Empty
        </button>
        <button
          type="button"
          onClick={() => trigger(MockQueryState.SUCCESS)}
          className={currentState === MockQueryState.SUCCESS ? 'active' : undefined}
          aria-pressed={currentState === MockQueryState.SUCCESS}
          aria-label="Simulate success state"
        >
          Success
        </button>
      </div>
    </div>
  )
}