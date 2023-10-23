import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const LOG_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logIn, result] = useMutation(LOG_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  },[result.data]);

  if (!props.show) {
    return null;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    await logIn({ variables: { username, password } });
    setUsername("");
    setPassword("");
    props.setPage("authors");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        name
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        <br></br>
        password
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button type="submit"> login</button>
      </form>
    </div>
  );
};

export default Login;
