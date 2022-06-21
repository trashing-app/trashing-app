const app = require('../app')
const request = require('supertest')


describe("GET /", () => {
  test("200 success get /", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Trash people");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});