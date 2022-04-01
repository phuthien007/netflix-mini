const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const movieRouter = require('./routes/movies')
const listRouter = require('./routes/lists')
const cors = require('cors')
// setup env
dotenv.config()
app.use(morgan('combined'))
app.use(cors())
// setup port
const PORT = process.env.PORT || 5000

// setup router
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth/', authRouter)
app.use('/api/v1/user/', userRouter)

app.use('/api/v1/movies/', movieRouter)
app.use('/api/v1/lists', listRouter)
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
}, (err, data) => {

    // console.log(err)
    if (err) {
        console.log("Something went wrong", err)
    } else if (data) {
        console.log("Connected to database cloud")

    }

})

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})
