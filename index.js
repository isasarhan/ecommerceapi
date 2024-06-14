const express = require("express");
const path = require('path')
const dbConnect = require('./config/dbConnect.js')
const app = express();
const dotenv = require('dotenv');
const routes = require("./start/routes.js");
const cors = require("cors");

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
dotenv.config()
dbConnect()
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

routes(app)
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Listenig to post ${port}`);
});
