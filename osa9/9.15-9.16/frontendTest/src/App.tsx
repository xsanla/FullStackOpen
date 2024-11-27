const App = () => {
  interface HeaderProps {
    head: string;
  }

  interface ContentProps {
    courseParts: CoursePart[];
  }
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
 
  interface CoursePartDesc extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartDesc {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDesc {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDesc {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union meber: ${JSON.stringify(value)}`
    );
  };
  const Header = (props: HeaderProps) => {
    return <h1>{props.head}</h1>
  }

  const Part = (props: CoursePart) => {
    switch(props.kind) {
      case "basic":
        return(
          <div>
            <h3>{props.name} {props.exerciseCount}</h3>
            <p>{props.description}</p>
          </div>
        );
      case "group":
        return(
          <div>
            <h3>{props.name} {props.exerciseCount}</h3>
            <p>project exercises {props.groupProjectCount}</p>
          </div>
        );
      case "background":
        return(
          <div>
            <h3>{props.name} {props.exerciseCount}</h3>
            <p>{props.description}</p>
            <a href={props.backgroundMaterial}>background material</a>
          </div>
        )
      case "special":
        return(
          <div>
            <h3>{props.name} {props.exerciseCount}</h3>
            <p>{props.description}</p>
            <p>Required skills {props.requirements}</p>
          </div>
        )
      default:
        return assertNever(props);
    };
  };

  const Content = (props: ContentProps): JSX.Element => {
    return (
      <div>
        {props.courseParts.map((coursePart: CoursePart) => {
          return( 
            <div>
            {Part(coursePart)}
            </div>
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
      <Header head="Half Stack application development"/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>

  );
};

export default App;
