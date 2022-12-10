import { hash } from "bcrypt"
import { v4 } from "uuid"

import AppDataSource from "@shared/infra/typeorm"

async function create() {
  const connection = await AppDataSource.initialize()
  const id = v4()
  const password = await hash("admin", 8)

  await connection.query(
    `INSERT INTO users(id, name, email, password, is_admin, driver_license, created_at) values('${id}', 'pedro-admin', 'pedro-admin@rentalx.com.br', '${password}', true, '0918934', '${new Date().toISOString()}')`
  )
  await connection.destroy()
}

create().then(() => console.log("Admin user has been created!"))
