import express from "express"
import cors from "cors"
import chalk from "chalk"
import productRouter from "./routes/productRouter.js"
import loginRouter from "./routes/loginRouter.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use(productRouter)
app.use(loginRouter)

app.listen(process.env.PORT, () => {
  console.log(
    chalk.bold.blue(`Server is running on port ${process.env.PORT}`)
    );
  });