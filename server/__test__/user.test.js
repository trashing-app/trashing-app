const app = require('../app')
const request = require('supertest')
const { User } = require('../models')

const user1 = {
  email: "test@mail.com",
  username: "test",
  password: "qwerty",
  phoneNumber: "081234567890",
  address:"Jakarta",
}

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(_ => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe("User Routes Test", ()=>{
  describe("POST /register - create new User", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/pub/users/register")
        .send(user1)
        .end((err, res) => {
          if(err) return done(err)
          const { body, status } = res

          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number))
          expect(body).toHaveProperty("email", user1.email)
          return done()
        })
    })

    test("400 Failed register - should return error if username is null", (done) => {
      request(app)
        .post("/pub/users/register")
        .send({
          email:"test@mail.com",
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
        .post("/pub/users/register")
        .send({
          username:"test",
          email:"test2@mail.com",
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
        .post("/pub/users/register")
        .send({
          username:"test2",
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
        .post("/pub/users/register")
        .send({
          username:"test2",
          email:"test@mail.com",
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
        .post("/pub/users/register")
        .send({
          username:"test2",
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
        .post("/pub/users/register")
        .send({
          username:"test2",
          email:"test2@mail.com",
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

  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
      .post("/pub/users/login")
      .send(user1)
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
      .post("/pub/users/login")
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
      .post("/pub/users/login")
      .send({
        email:"test@mail.com",
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
      .post("/pub/users/login")
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
      .post("/pub/users/login")
      .send({
        email:"test@mail.com",
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
})