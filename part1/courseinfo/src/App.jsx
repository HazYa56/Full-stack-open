const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}
const App = () => {

  return (
    <>
      <Header course = {'Half Stack application development'} />
      <Content 
        part1 = {'Fundamentals of React'}
        exercises1 = {10}
        part2 = {'Using props to pass data'}
        exercises2 = {7}
        part3 = {'State of a component'}
        exercises3 = {14}
      />
      <Total 
        exercises1 = {10}
        exercises2 = {7}
        exercises3 = {14}
      />
    </>
  )
}

export default App
