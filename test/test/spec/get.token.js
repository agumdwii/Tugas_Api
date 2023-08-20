const request = require("supertest");
const config = require('../../../data/config.json');
const userData= require('../../../data/user.data.json')

async function getToken() {
    const response = await request(config.baseUrl)
        .post("/authentications")
        .send(userData);
    const token = await response.body.data.accessToken
    return token;
}

module.exports = { getToken }



