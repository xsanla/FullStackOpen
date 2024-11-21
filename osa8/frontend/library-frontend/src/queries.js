import {gql} from '@apollo/client'
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: String!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
export const ALL_BOOKS = gql`
  query allBooks($genre: String){
    allBooks(genre: $genre)  {
      title
      author {
        name
      }
      published
    }
  }
`
export const ALL_GENRES = gql`
  query {
    allBooks  {
      genres
    }
  }
`
export const LOG_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int, $author: String!, $genres:[String]){
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      id
      author {
        name
      }
      genres
    }
  }
`
export const ME = gql`
  query {
    me {
      favouriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
    }
  }
`
