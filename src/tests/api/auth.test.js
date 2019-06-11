const request = require("supertest");

const { app } = require("../../app");
const { userOne, userPostLogin, fakeDB, resetDB } = require("../db");

beforeAll(done => {
  resetDB();
  done();
});

afterAll(done => {
  resetDB();
  done();
});

describe("API Auth", () => {
  beforeAll(done => {
    fakeDB();
    done();
  });

  test("POST api/auth return token", done => {
    request(app)
      .post("/api/auth")
      .send(userPostLogin)
      .then(res => {
        // token = res.body.token;
        // console.log(res.body);
        expect(res.body.token).not.toBeNull();
        done();
      });
  });

  // test("GET api/auth return user", done => {
  //   request(app)
  //     .get("/api/auth/user")
  //     .set("header", { "x-auth-token": token })
  //     .then(res => {
  //       console.log(res.body, token);
  //       expect(1).toBe(1);
  //       done();
  //     });
  // });
});
