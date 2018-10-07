// @flow

const { spawn } = require('child_process')
const querystring = require('query-string')
const path = require('path')
const { parse: parseurl } = require('url')
const http = require('http')
const { handler } = require('../src/index')
const debug = require('debug')

const readStream = s =>
  new Promise((resolve, reject) => {
    let buffer = ''
    s.on('data', d => (buffer += d.toString()))
    s.on('close', () => resolve(buffer))
    s.on('end', () => resolve(buffer))
  })

http
  .createServer(async (req, res) => {
    const { url, method } = req
    const reqBody = await readStream(req)

    debug('server')('%s: %s', method, url)

    const u = parseurl(url)

    const event = {
      body: reqBody,
      httpMethod: method,
      path: u.pathname,
      headers: {},
      queryStringParameters: querystring.parse(u.search),
    }

    const { statusCode, body, headers } = await handler(event)

    debug('server')('request over: %s', statusCode)

    res.writeHead(+statusCode, headers)
    res.end(JSON.stringify(body || ''))
  })
  .listen(8085)
