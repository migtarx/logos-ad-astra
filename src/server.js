const Server = {
  run() {
    require('dotenv').config();
    const express = require('express');
    const path = require('path');
    const app = express();
    const PORT = process.env.PORT || 3000;
    const routes = require('./routes/routes.js');
    const { launchLog } = require("./utils/logger.js")
    const { fetchSecrets } = require('./utils/secrets.js')
  
    app.use(express.json());
    app.use('/status', routes.statusRoute);
    app.use(express.static(path.join(__dirname, '../', 'public')));

    app.listen(PORT, async () => {
      await fetchSecrets();
      await launchLog(PORT);
    });
  }
}

module.exports = Server