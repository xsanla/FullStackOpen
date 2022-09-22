const App = () => {
  const course = {
    name: 'Half Stack application development test',
    parts: [ 
      {
        name: 'Fundamentals of React',
        excersises: 10
      },
      {
        name: 'Using props to pass data',
        excersises: 7
      },
      {
        name: 'State of a component',
        excersises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={course.parts}/>
      <Total content={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.content[0].name} ex={props.content[0].excersises}/>
      <Part name={props.content[1].name} ex={props.content[1].excersises}/>
      <Part name={props.content[2].name} ex={props.content[2].excersises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.ex}
    </p>
  )
}


const Total = (props) => {
  return (
    <p>Number of excersises {props.content[0].excersises + props.content[1].excersises + props.content[2].excersises}</p>
  )
}
export default App;
