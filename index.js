const express = require("express");
const dbConnect = require('./config/dbConnect.js')
const app = express();
const dotenv = require('dotenv');
const routes = require("./start/routes.js");

dotenv.config()
routes(app)
dbConnect()

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listenig to post ${port}`);
});
