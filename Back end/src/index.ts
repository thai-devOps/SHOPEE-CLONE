import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configEnv } from '~/constants/config'
import databaseServices from '~/services/database.services'
import userRouter from './routes/users.routes'
import { errorHandler } from './utils/errorHandler'
import { ErrorHandler } from './utils/response'
import { statusCode } from './constants/status'
import productRouter from './routes/products.routes'
import categoryRouter from './routes/categories.routes'
import purchaseRouter from './routes/purchases.routes'
import orderRouter from './routes/orders.routes'

// Connect to database
databaseServices.connect()
// Create express app
const app: express.Application = express()
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5172'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Logger
app.use(morgan('dev'))

//Delay response
// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//   setTimeout(() => {
//     next()
//   }, 1000)
// })

// Routes
app.use('/api', userRouter, productRouter, categoryRouter, purchaseRouter, orderRouter)
// handle resource not found
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new ErrorHandler(statusCode.NOT_FOUND, 'Resource not found')
  next(error)
})

// Error handler
app.use(errorHandler)

// Start server
app.listen(configEnv.PORT, () => {
  console.log(`Server is running on port ${configEnv.PORT}`)
})
