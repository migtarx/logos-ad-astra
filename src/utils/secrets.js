require('dotenv').config();
const { InfisicalClient } = require("@infisical/sdk");
const SecretMapper = require('@mpuertadev/infisical-secrets-mapper');
const { logger } = require("./logger.js")

module.exports = {
    fetchSecrets,
    injectSecrets
}

const client = new InfisicalClient({
    siteUrl: process.env.INFI_URI,
    auth: {
      universalAuth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      }
    },
});

async function fetchSecrets(){
    try {
        const secrets = await client.listSecrets({
            environment: process.env.ENV,
            projectId: process.env.PROJECT_ID,
            path: "/",
            includeImports: false
        });
        const mappedSecrets = new SecretMapper(secrets).secrets
        return mappedSecrets
    } catch (error) {
        logger.error("Failed to fetch system secrets from secret manager")
    }
}

async function injectSecrets(secrets){
    Object.keys(secrets).forEach(key => {
        process.env[key] = secrets[key];
    });
}