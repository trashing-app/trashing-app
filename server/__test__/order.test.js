const app = require('../app')
const request = require('supertest')
const { Order, User, Collector, sequelize } = require('../models');
const { encode } = require('../helpers/jwt-bcrypt');
const { queryInterface } = sequelize;

let validToken, invalidToken, validCollectorToken

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
    return queryInterface.bulkInsert(
      "Orders",
      [
        {
          userId:1,
          orderDate: new Date(),
          pickupDate: new Date(),
          collectorId: null,
          orderStatus: "Not Completed",
          approvalStatus: "Not Approved",
          paymentStatus: "Not Paid",
          createdAt: new Date(),
          updatedAt: new Date(),
          location: null,
          userChatId: "123",
          collectorChatId: null
        }
      ]
    )
  })
  .then(() => {
    validToken = encode({
      id:1,
      username: "test1"
    }, "secret")
    invalidToken = "123123"
    return queryInterface.bulkInsert(
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
  })
  .then(() => {
    validCollectorToken = encode({
      id:1,
      username: "collector1"
    }, "secret")
    return queryInterface.bulkInsert(
      'Categories',
      [
        {
          "name": "Plastik",
          "basePrice":1000,
          "description":"something",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }, 
        {
          "name": "Sampah basah",
          "basePrice":10000,
          "description":"something",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "name": "Sampah kering",
          "basePrice":100000,
          "description":"something",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      ],
      {}
    )
  })
  .then(() => {
    done();
  })
  .catch((err) => {
    done(err);
  });
});

afterAll(done => {
  Order.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      return User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    })
    .then(_ => {
      return Collector.destroy({ truncate: true, cascade: true, restartIdentity: true})
    })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /orders", () => {
  test("200 success get orders", (done) => {
    request(app)
      .get("/orders")
      .set("access_token", validToken)
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

  test("401 get orders with invalid token", (done) => {
    request(app)
      .get("/orders")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get orders without token", (done) => {
    request(app)
      .get("/orders")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get order by id", (done) => {
    request(app)
      .get("/orders/1")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("userId", expect.any(Number));
        expect(body).toHaveProperty("orderStatus", expect.any(String));
        expect(body).toHaveProperty("paymentStatus", expect.any(String));
        expect(body).toHaveProperty("approvalStatus", expect.any(String));
        expect(body).toHaveProperty("userChatId", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 get order by id not found", (done) => {
    request(app)
      .get("/orders/100")
      .set("access_token", validCollectorToken)
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
  
  test("200 success get nearest order", (done) => {
    request(app)
      .get("/orders/nearestOrder")
      .set("access_token", validCollectorToken)
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

});

describe("PUT /orders", () => {
  test("200 success complete order by id", (done) => {
    request(app)
      .put("/orders/complete/1")
      .set("access_token", validToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Order completed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success approve order by id", (done) => {
    request(app)
      .put("/orders/approve/1")
      .set("access_token", validCollectorToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Order approved");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success paid order by id", (done) => {
    request(app)
      .put("/orders/pay/1")
      .set("access_token", validCollectorToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Order paid");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success complete order by id", (done) => {
    request(app)
      .put("/orders/complete/1")
      .set("access_token", validCollectorToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Order completed");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 approve order with invalid token", (done) => {
    request(app)
      .put("/orders/approve/1")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 approve order without token", (done) => {
    request(app)
      .put("/orders/approve/1")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 paid order without token", (done) => {
    request(app)
      .put("/orders/paid/1")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 paid order with invalid token", (done) => {
    request(app)
      .put("/orders/paid/1")
      .set("access_token", invalidToken)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
})

describe("POST /orders", () => {
  test("201 success create new order", (done) => {
    request(app)
      .post("/orders")
      .set("access_token", validToken)
      .send({
          "orderItems":[
              {
                "categoryId":1,
                "description":"something",
                "orderId": 1,
                "weight":0,
                "price":0
              },
              {
                "categoryId":2,
                "description":"something",
                "orderId": 1,
                "weight":0,
                "price":0
              }
          ],
          "longitude":"107.5925576773082",
          "latitude": "-6.940669415817259"
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        done();
      })
      .catch((err) => {
        done(err);
      });
  })

  test("401 create new order with invalid token", (done) => {
    request(app)
      .post("/orders")
      .set("access_token", invalidToken)
      .send({
          "orderItems":[
              {
                "categoryId":1,
                "description":"something",
                "orderId": 1,
                "weight":0,
                "price":0
              },
              {
                "categoryId":2,
                "description":"something",
                "orderId": 1,
                "weight":0,
                "price":0
              }
          ],
          "longitude":"107.5925576773082",
          "latitude": "-6.940669415817259"
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  })

  test("401 create new order without token", (done) => {
    request(app)
      .post("/orders")
      .send({
          "orderItems":[
              {
                "categoryId":1,
                "description":"something",
                "orderId": 1,
                "weight":0,
                "price":0
              },
              {
                "categoryId":2,
                "description":"something",
                "orderId": 1,
                "weight":0,
                "price":0
              }
          ],
          "longitude":"107.5925576773082",
          "latitude": "-6.940669415817259"
      })
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  })
})