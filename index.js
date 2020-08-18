const app = require("./app");
const http = require("http");
const debug = require("debug")("app:server");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
});

const port = normalizePort(process.env.PORT || 80);
app.set("port", port);
const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

async function onListening() {
  try {
    await sequelize.authenticate();
    console.log("Database connect successful");
  } catch (err) {
    console.log("Database with err: ", err);
  }
  var addr = server.address();
  var bind = typeof addr == "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log("Server listening on " + bind);
}
