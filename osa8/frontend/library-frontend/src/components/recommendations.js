import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { ALL_BOOKS } from "../queries";

const Recommendations = (props) => {
  const [books, setBooks] = useState([]);
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: props.currentUser.favouriteGenre,
    },
    pollInterval: 5000,
  });
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <br></br>
      <p>Books in your favourite genre {props.currentUser.favouriteGenre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
