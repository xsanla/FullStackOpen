const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

const initialUsers = [
  {
    username: "user1",
    name: "12345",
    password: "666",
  },
  {
    username: "user2",
    name: "123456",
    password: "6667",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save();
});

test("all users are returned", async () => {
  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length);
});

test("Cannot create duplicate users", async () => {
  const response = await api.post("/api/users").send(initialUsers[0]);
  expect(response.status).toBe(400);
  const response2 = await api.get("/api/users");
  expect(response2.body).toHaveLength(initialUsers.length);
});

test("Cannot create user with shorter than minlenght name", async () => {
  const user = {
    username: "3",
    name: "123457",
    password: "666",
  };
  const response = await api.post("/api/users").send(user);
  expect(response.status).toBe(400);
  const response2 = await api.get("/api/users");
  expect(response2.body).toHaveLength(initialUsers.length);
});

test("Cannot create user with shorter than minlenght password", async () => {
  const user = {
    username: "user3",
    name: "123457",
    password: "6",
  };
  const response = await api.post("/api/users").send(user);
  expect(response.status).toBe(400);
  const response2 = await api.get("/api/users");
  expect(response2.body).toHaveLength(initialUsers.length);
});
