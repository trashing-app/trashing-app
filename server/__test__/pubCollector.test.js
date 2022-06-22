const app = require('../app')
const request = require('supertest')
const { Collector } = require('../models')

const collector1 = {
  email: "collector@mail.com",
  username: "collector",
  password: "qwerty",
  phoneNumber: "080987654321",
  address:"Penajam Paser Utara",
}

afterAll(done => {
  Collector.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(_ => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe("Collector Routes Test", ()=>{
  describe("POST /register - create new Collector", () => {
    test("201 Success register - should create new Collector", (done) => {
      request(app)
        .post("/pub/collectors/register")
        .send(collector1)
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number))
          expect(body).toHaveProperty("email", collector1.email)
          return done()
        })
    })

    test("400 Failed register - should return error if username is null", (done) => {
      request(app)
        .post("/pub/collectors/register")
        .send({
          email:"collector@mail.com",
          password: "qwerty"
        })
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Username is required")
          return done()
        })
    })

    test("400 Failed register - should return error if username is already taken", (done) => {
      request(app)
        .post("/pub/collectors/register")
        .send({
          username:"collector",
          email:"collector2@mail.com",
          password: "qwerty"
        })
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Username is already taken")
          return done()
        })
    })

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/pub/collectors/register")
        .send({
          username:"collector2",
          password: "qwerty"
        })
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email is required")
          return done()
        })
    })

    test("400 Failed register - should return error if email is already taken", (done) => {
      request(app)
        .post("/pub/collectors/register")
        .send({
          username:"collector2",
          email:"collector@mail.com",
          password: "qwerty"
        })
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email is already taken")
          return done()
        })
    })

    test("400 Failed register - should return error if email format is not valid", (done) => {
      request(app)
        .post("/pub/collectors/register")
        .send({
          username:"collector2",
          email:"123",
          password: "qwerty"
        })
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Invalid email format")
          return done()
        })
    })

    test("400 Failed register - should return error if password is null", (done) => {
      request(app)
        .post("/pub/collectors/register")
        .send({
          username:"collector2",
          email:"collector2@mail.com",
        })
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password is required")
          return done()
        })
    })
  })

  describe("POST /login - collector login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
      .post("/pub/collectors/login")
      .send(collector1)
      .end((err, res) => {
        if(err) return done(err)
        const { body, status } = res
        
        expect(status).toBe(200)
        expect(body).toHaveProperty("access_token", expect.any(String))
        return done()
      })
    })

    test("401 Failed login - empty email should return error", (done) => {
      request(app)
      .post("/pub/collectors/login")
      .send({
        password: "qwerty"
      })
      .end((err, res) => {
        if(err) return done(err)
        const { body, status } = res
        
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Email is required")
        return done()
      })
    })

    test("401 Failed login - empty password should return error", (done) => {
      request(app)
      .post("/pub/collectors/login")
      .send({
        email:"collector@mail.com",
      })
      .end((err, res) => {
        if(err) return done(err)
        const { body, status } = res
        
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Password is required")
        return done()
      })
    })

    test("401 Failed login - wrong email should return error", (done) => {
      request(app)
      .post("/pub/collectors/login")
      .send({
        email:"wrong@mail.com",
        password:"qwerty"
      })
      .end((err, res) => {
        if(err) return done(err)
        const { body, status } = res
        
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid email/password")
        return done()
      })
    })

    test("401 Failed login - wrong password should return error", (done) => {
      request(app)
      .post("/pub/collectors/login")
      .send({
        email:"collector@mail.com",
        password:"wrong"
      })
      .end((err, res) => {
        if(err) return done(err)
        const { body, status } = res
        
        expect(status).toBe(401)
        expect(body).toHaveProperty("message", "Invalid email/password")
        return done()
      })
    })

    
  })

  describe("PATCH /RegisterDevice", () => {
    test("200 Register device_token for collector", (done) => {
      request(app)
        .patch('/pub/collectors/registerdevice')
        .send({
          email:"collector@mail.com",
          device_token:"some_token"
        })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty("message", `Device registered`);
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("400 Register device_token for without", (done) => {
      request(app)
        .patch('/pub/collectors/registerdevice')
        .send({
          email:"collector@mail.com",
        })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", `Invalid token`);
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("404 Register device_token without email", (done) => {
      request(app)
        .patch('/pub/collectors/registerdevice')
        .send({
          device_token:"some_token"
        })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", `Email is required`);
          done();
        })
        .catch((err) => {
          done(err)
        })
    })

    test("404 Register device_token with unregistered email", (done) => {
      request(app)
        .patch('/pub/collectors/registerdevice')
        .send({
          email:"unregistered@mail.com",
          device_token:"some_token"
        })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(404);
          expect(body).toHaveProperty("message", `Not found`);
          done();
        })
        .catch((err) => {
          done(err)
        })
    })
  })
})