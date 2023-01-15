import { Router } from "express"

import { ResetUserPasswordController } from "../../../../modules/accounts/useCases/resetUserPassword/ResetUserPasswordController"
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMailUseCase/SendForgotPasswordMailController"

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetUserPasswordController = new ResetUserPasswordController()

passwordRoutes.post("/recovery", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetUserPasswordController.handle)

export { passwordRoutes }
