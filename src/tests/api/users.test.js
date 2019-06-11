const request = require("supertest");

const { app } = require("../../app");
const { userOne, userTwo, fakeDB, resetDB } = require("../db");

beforeAll(done => {
  resetDB();
  done();
});

describe("GET api/users", () => {
  describe("When data", () => {
    beforeAll(done => {
      fakeDB();
      done();
    });

    afterAll(done => {
      resetDB();
      done();
    });

    test("GET api/users return [{ name, email, password, avatar }]", done => {
      request(app)
        .get("/api/users")
        .then(res => {
          // console.log(res.body);
          expect(res.body[0]).toMatchObject(userOne);
          done();
        });
    });
  });

  describe("When no data", () => {
    beforeAll(done => {
      resetDB();
      done();
    });

    // afterAll(done => {
    //   resetDB();
    //   done();
    // });

    test("GET api/users return []", done => {
      request(app)
        .get("/api/users")
        .then(res => {
          expect(res.body).toEqual([]);
          done();
        });
    });
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

  test("POST api/users return token", done => {
    request(app)
      .post("/api/users")
      .send(userTwo)
      .then(res => {
        expect(res.body.token).not.toBeNull();
        done();
      });
  });

  test("POST api/users return { msg: [] }", done => {
    request(app)
      .post("/api/users")
      .send(userOne)
      .then(res => {
        expect(res.body.msg.length).toBeGreaterThanOrEqual(1);
        done();
      });
  });
});
