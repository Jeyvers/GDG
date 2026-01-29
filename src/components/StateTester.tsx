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
    <div className="state-tester">
      <span className="state-tester__label">Test states:</span>
      <div className="state-tester__buttons">
        <button
          type="button"
          onClick={() => trigger(MockQueryState.LOADING)}  
          className={currentState === MockQueryState.LOADING ? 'active' : undefined}
        >
          Loading                 
        </button>           
        <button
          type="button"
          onClick={() => trigger(MockQueryState.ERROR)}
          className={currentState === MockQueryState.ERROR ? 'active' : undefined}
        >
          Error
        </button>
        <button
          type="button"
          onClick={() => trigger(MockQueryState.EMPTY)}
          className={currentState === MockQueryState.EMPTY ? 'active' : undefined}
        >
          Empty
        </button>
        <button
          type="button"
          onClick={() => trigger(MockQueryState.SUCCESS)}
          className={currentState === MockQueryState.SUCCESS ? 'active' : undefined}
        >
          Success
        </button>
      </div>
    </div>
  )
}


// const states = [
//   MockQueryState.LOADING,
//   MockQueryState.ERROR,
//   MockQueryState.EMPTY,
//   MockQueryState.SUCCESS,
// ]

// <div className="state-tester__buttons">
//   {states.map((state) => (
//     <button
//       key={state}
//       type="button"
//       onClick={() => trigger(state)}
//       className={currentState === state ? 'active' : undefined}
//     >
//       {state.charAt(0) + state.slice(1).toLowerCase()} {/* "LOADING" -> "Loading" */}
//     </button>
//   ))}
// </div>

// const states = [
//   { state: MockQueryState.LOADING, label: 'Loading' },
//   { state: MockQueryState.ERROR, label: 'Error' },
//   { state: MockQueryState.EMPTY, label: 'Empty' },
//   { state: MockQueryState.SUCCESS, label: 'Success' },
// ]

// <div className="state-tester__buttons">
//   {states.map(({ state, label }) => (
//     <button
//       key={state}
//       type="button"
//       onClick={() => trigger(state)}
//       className={currentState === state ? 'active' : undefined}
//     >
//       {label}
//     </button>
//   ))}
// </div>