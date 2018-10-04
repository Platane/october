import AWS from 'aws-sdk'

import * as config from './config'

import type { APIGatewayEvent, ProxyResult } from 'flow-aws-lambda'

import { exec as createTransaction } from './controller/createTransaction'
import { exec as createUser } from './controller/createUser'
import { exec as createSafe } from './controller/createSafe'
import { exec as getSafe } from './controller/getSafe'

const headers = {
  'Content-Type': 'application/json',
  'access-control-allow-headers':
    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'access-control-allow-methods': 'POST,OPTIONS,PUT',
  'access-control-allow-origin': '*',
}

export const handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
  const path = event.path
    .split('/')
    .map(x => x.trim())
    .filter(Boolean)

  const m = event.httpMethod.toUpperCase()

  let exec =
    (m === 'PUT' &&
      path[0] === 'safe' &&
      path[2] === 'transaction' &&
      createTransaction) ||
    (m === 'PUT' && path[0] === 'safe' && path[2] === 'user' && createUser) ||
    (m === 'PUT' && path[0] === 'safe' && createSafe) ||
    (m === 'GET' && path[0] === 'safe' && getSafe) ||
    (() => () => Promise.reject({ statusCode: 405 }))

  AWS.config.update(config.aws)

  const docClient = new AWS.DynamoDB.DocumentClient()

  return exec(docClient)(path, event.body && JSON.parse(event.body))
    .then(body => ({
      statusCode: 200,
      headers,
      body,
    }))
    .catch(err => ({
      statusCode: (err && err.statusCode) || 500,
      headers,
      body: { message: err && err.message },
    }))
}
