const app = require('../app')
const request = require('supertest')
const { OrderItem, Category, Order, sequelize } = require('../models')
const { queryInterface } = sequelize;

beforeAll((done) => {
  queryInterface.bulkInsert(
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
  .then(() => {
    return queryInterface.bulkInsert(
      "Orders",
      [
        {
          orderDate:"2022-06-20 17:22:01.535+07",
          pickupDate:null,
          collectorId:null,
          orderStatus:"Not Completed",
          approvalStatus:"Not Approved",
          paymentStatus:"Not Paid",
          createdAt: new Date(),
          updatedAt: new Date(),
          location: null,
          userChatId: "123",
          collectorChatId: null
        }, 
        {
          orderDate:"2022-06-20 17:22:01.535+07",
          pickupDate:null,
          collectorId:null,
          orderStatus:"Not Completed",
          approvalStatus:"Not Approved",
          paymentStatus:"Not Paid",
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
      "OrderItems",
      [
        {
          "weight":0,
          "categoryId":1,
          "description":"something",
          "orderId":1,
          "price":0,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "weight":0,
          "categoryId":2,
          "description":"something",
          "orderId":1,
          "price":0,
          "createdAt": new Date(),
          "updatedAt": new Date()
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
  OrderItem.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      return Category.destroy({ truncate: true, cascade: true, restartIdentity: true})
    })
    .then(_ => {
      return Order.destroy({ truncate: true, cascade: true, restartIdentity: true})
    })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /orderItems", () => {
  test("200 success get order items by id", (done) => {
    request(app)
      .get("/OrderItems/1")
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

  test("200 success update order items by id", (done) => {
    request(app)
      .put("/OrderItems/1")
      .send({orderItems:[
        {
          weight:10,
          price:10000,
          description:"something",
          categoryId:1
        },
        {
          weight:10,
          price:10000,
          description:"something",
          categoryId:2
        }
      ]})
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

  test("404 order items not found", (done) => {
    request(app)
      .put("/OrderItems/100")
      .send({orderItems:[
        {
          weight:10,
          price:10000,
          description:"something",
          categoryId:1
        },
        {
          weight:10,
          price:10000,
          description:"something",
          categoryId:2
        }
      ]})
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