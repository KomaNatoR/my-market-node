const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const { DB_HOST, PORT = 3003 } = process.env;


mongoose.connect(DB_HOST)
    .then(app.listen(PORT, () => console.log(`SERVING! Port:${PORT}`)))
    .catch(error => console.log(error.message));