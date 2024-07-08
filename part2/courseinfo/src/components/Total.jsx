const Total = (props) => {
  let summation = props.parts.map(part => part.exercises).reduce(( sum, num ) => { return sum + num },0);
  return (
    <h4>Total of {summation} exercises.</h4>
  )
}
export default Total