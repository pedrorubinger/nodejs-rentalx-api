import { Router } from "express"
import multer from "multer"

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController"
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController"
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const upload = multer({
  dest: "./tmp",
})
const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
)
categoriesRoutes.get("/", listCategoriesController.handle)
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
)

export { categoriesRoutes }
