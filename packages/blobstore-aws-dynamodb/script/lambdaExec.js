// @flow

const { spawn } = require('child_process')
const querystring = require('query-string')
const path = require('path')

/* eslint-disable no-console */

/**
 * spawn a process and wrap it around a lambda
 */
const spawnProcess = (cmd, args, options) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options)

    let dataBuffer = ''
    let errBuffer = ''
    child.stdout.on('data', data => {
      dataBuffer += data.toString()
    })
    child.stderr.on('data', data => {
      errBuffer += data.toString()
    })

    child.on('close', code => {
      if (errBuffer && code === 0) console.warn(errBuffer)

      if (errBuffer && code !== 0) console.error(errBuffer)

      if (code === 0) resolve(dataBuffer)
      else reject(errBuffer || `fails with code ${code}`)
    })
  })

/**
 * exec a lambda function
 * pass the path to lambda script, and a formated url
 */
const lambdaExec = src => ({ pathname, search }, httpMethod = 'GET') => {
  const event = {
    httpMethod,
    path: pathname,
    headers: {},
    queryStringParameters: querystring.parse(search),
  }

  const escapedEvent = JSON.stringify(event)

  return spawnProcess(
    path.resolve(__dirname, '../node_modules/.bin/babel-node'),
    [
      '-e',
      `require("${src}").handler(${escapedEvent}).then(({statusCode}) => statusCode!==200&&Promise.reject(statusCode)).then(({body}) => console.log(JSON.stringify(body)))`,
    ],
    {
      cwd: path.resolve(__dirname, '..'),
      env: {
        ...process.env,
        BABEL_ENV: 'node',
      },
    }
  )
}

module.exports = lambdaExec
