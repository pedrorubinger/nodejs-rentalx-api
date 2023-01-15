import { Router } from "express"

import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMailUseCase/SendForgotPasswordMailController"

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()

passwordRoutes.post("/recovery", sendForgotPasswordMailController.handle)

export { passwordRoutes }
