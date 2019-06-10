const request = require("supertest");

const { start, app } = require("../../server");
const { userOne, fakeDB, resetDB } = require("../db");

// beforeAll(done => {
//   start();
//   setTimeout(() => {
//     done();
//   }, 3000);
// });

describe("GET api/users", () => {
  beforeAll(done => {
    resetDB();
    fakeDB();
    done();
  });

  afterAll(done => {
    resetDB();
    done();
  });

  test("GET api/users should return [{ _id, name, password, email }]", () => {
    request(app)
      .get("/api/users")
      .then(res => expect(res.body[0].toMatchObject(userOne)));
  });
});

describe("POST api/users", () => {
  beforeAll(done => {
    resetDB();
    done();
  });

  afterAll(done => {
    resetDB();
    done();
  });

  test("POST api/users should return token", () => {
    request(app)
      .post("/api/users")
      .send(userOne)
      .then(res => expect(res.body.token.not.toBeNull()));
  });
});
