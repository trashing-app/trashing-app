const app = require('../app')
const request = require('supertest')
const { Collector, sequelize } = require('../models')
const { queryInterface } = sequelize;

beforeAll((done) => {
  queryInterface.bulkInsert(
    'Collectors',
    [
      {
        "username": "collector1",
        "email": "collector1@mail.com",
        "password": "qwerty",
        "phoneNumber": "08122233444",
        "address": "Kuningan",
        "location": null,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }, 
      {
        "username": "collector2",
        "email": "collector2@mail.com",
        "password": "qwerty",
        "phoneNumber": "08122233444",
        "address": "Kuningan",
        "location": null,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "username": "collector3",
        "email": "collector3@mail.com",
        "password": "qwerty",
        "phoneNumber": "08122233444",
        "address": "Kuningan",
        "location": null,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ],
    {}
  )
  .then(() => {
    done();
  })
  .catch((err) => {
    done(err);
  });
});

afterAll(done => {
  Collector.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /collectors", () => {
  test("200 success get collectors", (done) => {
    request(app)
      .get("/collectors")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get collector by id", (done) => {
    request(app)
      .get("/collectors/1")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get collector location", (done) => {
    request(app)
      .get(`/collectors/location/1`)
      // .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("location", expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 get selected collector location not found", (done) => {
    request(app)
      .get(`/collectors/location/99`)
      // .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
 
});

describe("PUT /collectors/:id", () => {
  test("200 success update selected collector", (done) => {
    request(app)
      .put(`/collectors/1`)
      // .set("access_token", validToken)
      .send({
        "username": "test1[edited]"
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Collector has been updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success update collector location", (done) => {
    request(app)
      .patch(`/collectors/location/1`)
      // .set("access_token", validToken)
      .send({
        "longitude":"107.5925576773082",
        "latitude":"6.940669415817259"
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", `Location updated`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 update selected collector not found", (done) => {
    request(app)
      .put(`/collectors/99`)
      // .set("access_token", validToken)
      .send({
        "username": "test99[edited]"
      })
      .then((response) => {
        const { body, status } = response;
        
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 update selected collector location not found", (done) => {
    request(app)
      .patch(`/collectors/location/99`)
      // .set("access_token", validToken)
      .send({
        "longitude":"107.5925576773082",
        "latitude":"6.940669415817259"
      })
      .then((response) => {
        const { body, status } = response;
        
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  
});

describe("Delete /collectors/:id", () => {
  test("200 success delete selected collector", (done) => {
    request(app)
      .delete(`/collectors/1`)
      // .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Collector deleted");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
})