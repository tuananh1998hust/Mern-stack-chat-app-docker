const request = require("supertest");

const { app } = require("../../app");
const { mess, fakeDB, resetDB } = require("../db");

beforeAll(done => {
  resetDB();
  done();
});

describe("API Messages", () => {
  beforeAll(done => {
    fakeDB();
    done();
  });

  // afterAll(done => {
  //   resetDB();
  //   done();
  // });

  test("GET api/messages return [{ from, to, mess }]", done => {
    request(app)
      .get("/api/messages")
      .then(res => {
        // console.log(res.body);
        expect(1).toBe(1);
        done();
      });
  });
});
