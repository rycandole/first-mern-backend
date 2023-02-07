require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoute = require('./routes/workouts');
const userRoute = require('./routes/user');

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoute)
app.use('/api/user', userRoute)

// connect to db
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
