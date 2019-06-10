const request = require("supertest");

const { start, app } = require("../../server");
const { userPostLogin, fakeDB, resetDB } = require("../db");

// beforeAll(done => {
//   start();
//   setTimeout(() => {
//     done();
//   }, 3000);
// });

describe("POST api/auth", () => {
  beforeAll(done => {
    fakeDB();
    done();
  });

  afterAll(done => {
    resetDB();
    done();
  });

  test("POST api/auth should return token", () => {
    request(app)
      .get("/api/auth")
      .send(userPostLogin)
      .then(res => expect(res.body.token.not.toBeNull()));
  });
});
