import { container } from "tsyringe"

import { IDateProvider } from "./DateProvider/IDateProvider"
import { DayjsDateProvider } from "./implementations/DayjsDateProvider"
import { EtherealMailProvider } from "./implementations/EtherealMailProvider"
import { IMailProvider } from "./MailProvider/IMailProvider"

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)
