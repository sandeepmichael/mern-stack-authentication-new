const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')


dotenv.config()
//connect to DB
mongoose.connect(process.env.MONGO_ID, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log('connected to mongoDB')
}).catch((err) => {
     console.error(err)
})

app.use(cors())
app.use(express.json())


//api routes
app.use('/auth', require('./routes/userRoutes'))
//...

// setup build



const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`)
})