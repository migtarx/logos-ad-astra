require('dotenv').config();
const pino = require("pino");
const figlet = require("figlet");
const pjson = require('pjson');
const colors = require('colors')
const gradient = require('gradient-string');
const fs = require('fs');
const path = require('path');
const isProduction = process.env.ENV === "prod";
const runtimeMode = isProduction ? "Production" : "Development";
const logsDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, 'server.log');
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '');
}

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "SYS:dd/mm/yyyy - HH:MM:ss" },
      },
      {
        target: "pino/file",
        options: { destination: path.join(`${logsDir}/server.log`) },
      },
    ],
  },
});

async function launchLog(port) {
  await figlet("LOGOS AD ASTRA", function (err, data) {
    console.log(gradient('blue', 'white')(data));
  });
  console.log("Version: ".cyan + pjson.version)
  console.log("Server port: ".cyan + port.green)
  console.log("Runtime mode: ".cyan +  (isProduction ? runtimeMode.red : runtimeMode.gray) + "\n")
}

module.exports = {logger, launchLog};
