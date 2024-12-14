require('dotenv').config();
const mongoose = require('mongoose');
const localConnStr = `mongodb://127.0.0.1/${process.env.DB_NAME}`;
const remoteConnStr = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const isRemoteConnectionEnabled = process.env.REMOTE_DB_CONNECTION === "enabled";
mongoose.set('strictQuery', false);

module.exports = mongoose.connect(isRemoteConnectionEnabled ? remoteConnStr : localConnStr);