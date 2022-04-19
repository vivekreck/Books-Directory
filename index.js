const express = require('express')
const cors = require("cors")

const CONFIG = require('./config/config')

// routers
const routes = require('./routes')

const app = express()
app.use(express.json())

// Utilize a more restrictive policy if needed
app.use(cors())

app.use('/api/directory', routes.directory);

app.listen(CONFIG.port, () => {
    console.log("Server up on " + CONFIG.port)
})
