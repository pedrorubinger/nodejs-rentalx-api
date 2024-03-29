import express, { Request, Response } from "express"
import swagger from "swagger-ui-express"
import "reflect-metadata"
import "express-async-errors"

import "../../container"
import swaggerFile from "../../../swagger.json"
import { AppError } from "../../errors/AppError"
import { router } from "./routes"

const app = express()

app.use(express.json())
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile))
app.use(router)

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "APP_ERROR",
      message: err.message,
    })
  }

  return response.status(500).json({
    status: "INTERNAL",
    message: `Internal server error: ${err?.message ?? err}`,
  })
})

export { app }
