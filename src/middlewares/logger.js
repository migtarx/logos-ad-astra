const { logger } = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');
const statusServerIp = process.env.STATUS_SERVER_IP

const logRequest = (req, res, next) => {
  const { method, ip } = req;
  const url = req.originalUrl || req.url;
  const userIp = req.headers['x-real-ip'] || ip;
  const requestId = uuidv4();
  const start = process.hrtime();

  if (userIp !== statusServerIp){
    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(start);
      const durationInMilliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(3);
      const message = {"ID": requestId, "Method": method, "Route": url, "Request IP": userIp, "Status": res.statusCode, "Response time": durationInMilliseconds}
      if (isSuccessfulStatusCode(res.statusCode)){
        logger.info(message);
      } else {
        logger.warn(message);
      }
    });
  }

  next();
};

const isSuccessfulStatusCode = (statusCode) => {
  return statusCode >= 200 && statusCode < 400;
};

module.exports = logRequest;
