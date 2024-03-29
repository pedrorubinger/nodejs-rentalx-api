import { Router } from "express"
import multer from "multer"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController"
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController"

import uploadConfig from "../../../../config/upload"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const carsRoutes = Router()

const upload = multer(uploadConfig.upload("./tmp/cars"))

const createCarController = new CreateCarController()
const createCarSpecificationController = new CreateCarSpecificationController()
const listAvailableCarsController = new ListAvailableCarsController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
)
carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
)

export { carsRoutes }
