const mongoose = require("mongoose");

const app = require("./app");
// "1241Mon_Mon1241"


const DB_HOST = "mongodb+srv://Serhii:1241Mon_Mon1241@cluster0.gznqb.mongodb.net/market?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB_HOST)
    .then(app.listen(3000, () => console.log("SERVING! Port:3000")))
    .catch(error => console.log(error.message));