'use strict'
const superagent = require('superagent');
const webhook = process.env.webhook || require('./.env.js').webhook;
const slackbottoken = process.env.oauth || require('./.env,js').oath;
const postEndpoint = 'https://slack.com/api/chat.postMessage'

async function bramblebotpost(message) {
    await superagent.post(webhook).send({ "text": message, as_user:true,
})
}

async function bramblebotpost2(message, channel){
    await superagent.post(postEndpoint).send({
        token: slackbottoken,
        text: message,
        channel: channel,
        as_user: true
    })
}

module.exports = bramblebotpost2