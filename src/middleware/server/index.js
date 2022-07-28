/* eslint-disable */
const axios = require('axios');

const allData = () => {
    return axios.get("http://localhost:5000/api/data/");
}

const timerData = () => {
    return axios.get("http://localhost:5000/api/timer/timerData");
}

const addReportData = (obj) => {
    return axios.post("http://localhost:5000/api/data/addData", obj);
}

const addTimerData = (obj) => {
    return axios.post("http://localhost:5000/api/timer/addTimerData", obj);
}

const authentication = (obj) => {
    return axios.post("http://localhost:5000/api/auth/userData", obj);
}

module.exports = {
    allData,
    addReportData,
    timerData,
    addTimerData,
    authentication
};
