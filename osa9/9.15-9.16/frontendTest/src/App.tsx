const App = () => {
  interface HeaderProps {
    head: string;
  }
  type CoursePart = {
    name: string;
    exerciseCount: number;
  }
  interface ContentProps {
    courseParts: CoursePart[];
  }

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const Header = (props: HeaderProps) => {
    return <h1>{props.head}</h1>
  }

  const Content = (props: ContentProps) => {
    return (
      <div>
        {props.courseParts.map((CoursePart) => {
          return(
            <p>
              {CoursePart.name} {CoursePart.exerciseCount}
            </p>
          )
        })}
      </div>
    )
  }

  const Total = (props: ContentProps) => {
    return (
      <p>
        Number of exercises {props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
      </p>
    )
  }
  return (
    <div>
      <Header head={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>

  );
};

export default App;
