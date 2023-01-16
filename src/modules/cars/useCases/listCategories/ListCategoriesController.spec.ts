import { hash } from "bcrypt"
import request from "supertest"
import { DataSource } from "typeorm"
import { v4 } from "uuid"

import { app } from "../../../../shared/infra/http/app"
import { createConnection } from "../../../../shared/infra/typeorm"

let connection: DataSource

describe("List Categories", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "pedro-admin@rentalx.com.br", password: "admin" })

    const { refresh_token } = responseToken.body

    await request(app)
      .post("/categories")
      .send({
        name: "category super test",
        description: "category super test description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })
    const response = await request(app).get("/categories")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
