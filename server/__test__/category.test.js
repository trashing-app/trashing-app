const app = require('../app')
const request = require('supertest')
const { Category, sequelize } = require('../models')
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
    done();
  })
  .catch((err) => {
    done(err);
  });
});

afterAll(done => {
  Category.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /categories", () => {
  test("200 success get categories", (done) => {
    request(app)
      .get("/categories")
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