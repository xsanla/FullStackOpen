const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
        if (args.genre === "all") {
          return result;
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
      if (!context.currentUser) {
        throw new GraphQLError("Authentication failed", {
          extensions: {
            code: "AUTH_INVALID",
          },
        });
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
      const book = new Book({ ...args, author: author });
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
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Authentication failed", {
          extensions: {
            code: "AUTH_INVALID",
          },
        });
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
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "@ssword") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
