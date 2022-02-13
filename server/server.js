require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use(cookieParser())


require("./config/mongoose.config")
require("./routes/collector.routes")(app)
require("./routes/user.routes")(app)

app.listen(process.env.MY_PORT, () => console.log(`You are connected to port ${process.env.MY_PORT}`))