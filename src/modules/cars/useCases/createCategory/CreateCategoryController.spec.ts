import { hash } from "bcrypt"
import request from "supertest"
import { DataSource } from "typeorm"
import { v4 } from "uuid"

import { app } from "../../../../shared/infra/http/app"
import { createConnection } from "../../../../shared/infra/typeorm"

let connection: DataSource

describe("Create Category", () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations()

    const id = v4()
    const email = "pedro-admin@rentalx.com.br"
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO users(id, name, email, password, is_admin, driver_license, created_at) values('${id}', 'pedro-admin', '${email}', '${password}', true, '0918934', '${new Date().toISOString()}')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "pedro-admin@rentalx.com.br", password: "admin" })

    const { token } = responseToken.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category super test",
        description: "category super test description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(201)
  })

  it("should not be able to create a new category if name already exists", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "pedro-admin@rentalx.com.br", password: "admin" })

    const { token } = responseToken.body

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category super test",
        description: "category super test description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(400)
  })
})
