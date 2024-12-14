const Server = require('./src/server.js');
const { fetchSecrets, injectSecrets } = require('./src/utils/secrets.js');
const { logger } = require('./src/utils/logger.js');

(async () => {
    const secrets = await fetchSecrets();
    if (secrets?.INFI_READY === 'true'){
        await injectSecrets(secrets)
        setTimeout(() => {
            logger.info("Secrets fetched from secret manager");
        }, 1000);
    } else {
        setTimeout(() => {
            logger.error("No secrets found in secret manager")
        }, 1000);
    }
    Server.run();
})();

