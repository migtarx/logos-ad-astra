require('dotenv').config();
const pjson = require('pjson');
const execMode = process.env.ENV;

module.exports = {
    getStatus,
    getStatusHeartBeat
};

function getServerStatusData(isHeartBeat = false){
    const statusInformation = {
        Status: 'OK',
        'Runtime-Mode': execMode == 'prod' ? 'Production' : 'Development',
        'Application-Description': 'Logos Ad Astra',
        'Application-Author': 'miguel@mpuerta.dev',
        'Application-Owner': 'Miguel Puerta',
    }
    if (!isHeartBeat) {
        statusInformation['Application-Version'] = pjson.version;
    }
    return statusInformation;
}

function getStatus(req, res) {
    return res.json(getServerStatusData());
}

function getStatusHeartBeat(req, res) {
    return res.json(getServerStatusData(true));
}