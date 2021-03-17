import React, { useState } from 'react'

const Button = ({handleClick, text}) => {

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
  
}

const Statistic = ({text, value}) => {
  
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  const all = props.good + props.bad + props.neutral

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <br/>
      <table>
        <tbody>
          <Statistic text="good" value= {props.good}/>
          <Statistic text="neutral" value= {props.neutral}/>
          <Statistic text="bad" value= {props.bad}/>
          <Statistic text="all" value= {all}/>
          <Statistic text="average" value= {props.good - props.bad/all}/>
          <Statistic text="positive" value= {(props.good/all)*100 + ' %'}/>
        </tbody>
      </table>
      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
