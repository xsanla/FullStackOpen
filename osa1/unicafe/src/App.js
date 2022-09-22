import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)


const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good " value={good} />
            <StatisticLine text="neutral " value={neutral} />
            <StatisticLine text="bad " value={bad} />
            <StatisticLine text="all " value={good + neutral + bad} />
            <StatisticLine text="average " value={(good - bad) / (good + neutral + bad)} />
            <StatisticLine text="positive " value={good / (good + neutral + bad) * 100 + '%'} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = async (name) => {
    switch (name) {
      case 'good':
        await goodAsync()
        return 1
      case 'neutral':
        await neutralAsync()
        return 1
      case 'bad':
        await badAsync()
        return 1
    }
  }

  async function goodAsync() {
    setGood(good + 1)
    return 1
  }
  async function neutralAsync() {
    setNeutral(neutral + 1)
    return 1
  }
  async function badAsync() {
    setBad(bad + 1)
    return 1
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => clickHandler('good')} text="good" />
        <Button handleClick={() => clickHandler('neutral')} text="neutral" />
        <Button handleClick={() => clickHandler('bad')} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>

  )
}

export default App