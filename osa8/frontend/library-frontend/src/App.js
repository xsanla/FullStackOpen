import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/recommendations";
import { useApolloClient, useQuery, gql } from "@apollo/client";

const ME = gql`
  query {
    me {
      favouriteGenre
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );

  const me = useQuery(ME, {
    pollinterval: 5000,
  });
  useEffect(() => {
    if(me.data != null){
      setCurrentUser(me.data.me)
    }
  }, [me.data])

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <>
            <button onClick={() => setPage("reccommend")}>reccomend</button>
            <button
              onClick={() => {
                setToken(null);
                localStorage.clear();
                client.resetStore();
              }}
            >
              log out
            </button>
          </>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login
        setCurrentUser={setCurrentUser}
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommendations currentUser={currentUser} show={page === "reccommend"} />
    </div>
  );
};

export default App;
