const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require('./models/user')
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDb:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type User {
      username: String!
      id: ID!
      favouriteGenre: String
    }
    
    type Token {
      value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre:String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int
            author: String!
            genres: [String]
        ): Book
        editAuthor(name: String, setBornTo: Int): Author
        createUser(
          username: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.count({}),
    authorCount: () => Author.count({}),
    me: (root, args, context) => context.currentUser,
    allBooks: async (root, args, context) => {
      let result = await Book.find({}).populate("author", { name: 1 });
      if (args.author != null) {
        result = result.filter((b) => b.author.name === args.author);
      }
      if (args.genre != null) {
        if(args.genre === "all"){
          return result
        }
        result = result.filter((b) => b.genres.includes(args.genre));
      }
      return result;
    },
    allAuthors: async () => {
      return (await Author.find({})).map(async (a) => {
        a.bookCount = await Book.count({ author: a.id });
        return a;
      });
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError("Authentication failed", {
          extensions: {
            code: "AUTH_INVALID",
          }
        })
      }
      var author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          author = await Author.create({ name: args.author });
        } catch (error) {
          throw new GraphQLError("Author creation failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      const book = new Book({ ...args, author: author});
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError("Authentication failed", {
          extensions: {
            code: "AUTH_INVALID",
          }
        })
      }
      const authorToEdit = await Author.findOne({ name: args.name });
      if (authorToEdit != undefined) {
        authorToEdit.born = args.setBornTo;
        try {
          authorToEdit.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.setBornTo,
              error,
            },
          });
        }

        return authorToEdit;
      }
      return null;
    },
    createUser: async (root, args, context) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== '@ssword' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
