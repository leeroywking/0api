'use strict'
const superagent = require('superagent');
const webhook = process.env.webhook || require('./.env.js').webhook;
const slackbottoken = process.env.oauth || require('./.env.js').oath;

const getEndpoint = (args) => {
    const keys = Object.keys(args)
    let query = 'https://slack.com/api/chat.postMessage?'
    for (let key of keys) {
        query += `${key}=${args[key]}&`
    }
    query += 'pretty=1'
    return query
}


async function bramblebotpost2(message, channel) {
    console.log({ token: slackbottoken, message, channel })
    const args = {
        token: slackbottoken,
        text: message,
        channel: channel,
        as_user: true
    }
    console.log('trying:',getEndpoint(args))
    await superagent.get(getEndpoint(args)).catch(e => {
        console.error(e)
        return e
    })
}

module.exports = bramblebotpost2