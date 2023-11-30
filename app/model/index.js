const dbConfig = require("../../config/database");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.users = require("./user.model.js")(mongoose);
db.rooms = require("./room.model.js")(mongoose);
db.messages = require("./message.model.js")(mongoose);

module.exports = db;