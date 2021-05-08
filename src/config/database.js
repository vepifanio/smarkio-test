const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "{username}",
    password: "{password}",
    database: "{database}",
    host: "{host}",
    dialect: "mysql"
  },
}