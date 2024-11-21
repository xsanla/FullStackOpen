import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/recommendations";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ME, BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState({ favouriteGenre: "all" });
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );
    useSubscription(BOOK_ADDED, {
      onData: ({data}) => {
        const addedBook = data.data.bookAdded
        window.alert("A new book was just added!")
        client.cache.updateQuery({query: ALL_BOOKS}, ({allBooks}) => {
          return {
            allBooks: allBooks.concat(addedBook)
          }
        })
      }
    })
  const me = useQuery(ME, {
    pollinterval: 5000,
  });
  useEffect(() => {
    if (me.data != null) {
      if (me.data.me != null) {
        setCurrentUser(me.data.me);
      }
    }
  }, [me.data, token]);

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
                setCurrentUser({ favouriteGenre: "all" });
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
