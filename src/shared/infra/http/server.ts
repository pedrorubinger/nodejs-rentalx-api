import { createConnection } from "../typeorm"
import { app } from "./app"

app.listen(3333, () => console.log("Server is running..."))

createConnection("database_rentalx")
