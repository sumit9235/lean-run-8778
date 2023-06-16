const mongoose = require('mongoose');

require("dotenv").config()

const connectionToDb = mongoose.connect(process.env.mongoURL)

module.exports = connectionToDb