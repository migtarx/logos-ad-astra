require('dotenv').config();
const deployEnv = process.env.DEPLOY_ENV;
const ntfyUser = process.env.NTFY_USER;
const ntfyPasswd = process.env.NTFY_PASSWD;
const ntfyServer = process.env.NTFY_SERVER_URL;
const projectName = process.env.PROJECT_NAME;
const fullUrl = `${ntfyServer}/${projectName}`;
const encodedAuth = Buffer.from(`${ntfyUser}:${ntfyPasswd}`).toString('base64');

(async function() {
    await fetch(fullUrl, {
        method: 'POST',
        body: `${projectName} successfully deployed to ${deployEnv}`,
        headers: {
            'Authorization': `Basic ${encodedAuth}`,
            'Title': `Successful deploy - [${projectName}]`,
            'Tags': 'white_check_mark'
        }
    })
})();