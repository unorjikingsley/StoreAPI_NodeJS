const express = require('express');
const app = express();

const connectDB = require('./db/connect');
require('dotenv').config();
require('express-async-errors');

const productsRouter = require('./routes/products')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1>')
});

app.use('/api/v1/products', productsRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on PORT ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start();
