const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Content = (props) => {
    const parts = props.content
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} ex={part.exercises} />
        )}
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
    const parts = props.content
    const calcTotal = parts.reduce((total, p) => {
      return total + p.exercises
    },0)
  
    return (
      <p>total of {calcTotal} exercises</p>
    )
  }
  
  const Course = (props) => {
    const course = props.course
    return (
      <div>
        <Header course={course} />
        <Content content={course.parts} />
        <Total content={course.parts} />
      </div>
    )
  }

  export default Course