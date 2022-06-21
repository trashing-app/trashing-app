const app = require('../app')
const request = require('supertest')
const { History, Order, User, Collector, sequelize } = require('../models')
const { queryInterface } = sequelize;

beforeAll((done) => {
  queryInterface.bulkInsert(
    "Users",
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
    ]
  )
  .then(() => {
    return queryInterface.bulkInsert(
      "Collectors", 
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
        }
      ]
    )
  })
  .then(() => {
    return queryInterface.bulkInsert(
      "Orders", 
      [
        {
          userId:1,
          orderDate: new Date(),
          pickupDate: new Date(),
          collectorId: 1,
          orderStatus: "Completed",
          approvalStatus: "Approved",
          paymentStatus: "Paid",
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
    return queryInterface.bulkInsert(
      "Histories", 
      [
        {
          userId:1,
          collectorId:1,
          orderId:1,
          description:"Something",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
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
  History.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      return Order.destroy({ truncate: true, cascade: true, restartIdentity: true})
    })
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

describe("GET /histories", () => {
  test("200 success get histories by userId", (done) => {
    request(app)
      .get("/histories/1")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  })
})