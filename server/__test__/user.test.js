const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize;

beforeAll((done) => {
  queryInterface.bulkInsert(
    'Users',
    [
      {
        "username": "test1",
        "email": "test1@mail.com",
        "password": "qwerty",
        "phoneNumber": "08122233444",
        "address": "Kuningan",
        "location": null,
        "balance": 50000,
        "role": "user",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }, 
      {
        "username": "test2",
        "email": "test2@mail.com",
        "password": "qwerty",
        "phoneNumber": "08122233444",
        "address": "Kuningan",
        "location": null,
        "balance": 50000,
        "role": "user",
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "username": "test3",
        "email": "test3@mail.com",
        "password": "qwerty",
        "phoneNumber": "08122233444",
        "address": "Kuningan",
        "location": null,
        "balance": 50000,
        "role": "user",
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
  User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /users", () => {
  test("200 success get users", (done) => {
    request(app)
      .get("/users")
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

  test("200 success get user by id", (done) => {
    request(app)
      .get("/users/1")
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
 
});

describe("PUT /users/:id", () => {
  test("200 success update selected user", (done) => {
    request(app)
      .put(`/users/1`)
      // .set("access_token", validToken)
      .send({
        "username": "test1[edited]"
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "User has been updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success topup selected user's balance", (done) => {
    request(app)
      .put(`/users/topup/1`)
      // .set("access_token", validToken)
      .send({
        "balance": 1000
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", `The balance added 1000`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success reduce selected user's balance", (done) => {
    request(app)
      .put(`/users/reduce/1`)
      // .set("access_token", validToken)
      .send({
        "balance": 1000
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", `The balance reduced 1000`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success update user location", (done) => {
    request(app)
      .patch(`/users/location/1`)
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
  
  test("200 success get user location", (done) => {
    request(app)
      .get(`/users/location/1`)
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

  test("200 success delete selected user", (done) => {
    request(app)
      .delete(`/users/1`)
      // .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;
        
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "User deleted");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 update selected user not found", (done) => {
    request(app)
      .put(`/users/99`)
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

  test("404 update selected user location not found", (done) => {
    request(app)
      .patch(`/users/location/99`)
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
  
  test("404 get selected user location not found", (done) => {
    request(app)
      .get(`/users/location/99`)
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

  test("404 topup selected user balance not found", (done) => {
    request(app)
      .put(`/users/topup/99`)
      // .set("access_token", validToken)
      .send({
        "balance":1000
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

  test("404 reduce selected user balance not found", (done) => {
    request(app)
      .put(`/users/reduce/99`)
      // .set("access_token", validToken)
      .send({
        "balance":1000
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