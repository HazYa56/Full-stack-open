import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <p>good {good}<br />neutral {neutral}<br />bad {bad}<br />all {good+neutral+bad}
      <br />average {(good-bad)/(good+neutral+bad)}
      <br />positive {(good*100)/(good+neutral+bad)}</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App