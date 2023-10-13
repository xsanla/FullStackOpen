import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: String!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const result = useQuery(ALL_AUTHORS, { pollInterval: 5000 });
  const handleSubmit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo:born } });
    setName("");
    setBorn("");
  };
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
          name<select value={name} onChange={({target}) => setName(target.value)}>
            {authors.map((a)=> (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
          <br></br>
          born<input value={born} onChange={({ target }) => setBorn(target.value)}></input>
          <br></br>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
