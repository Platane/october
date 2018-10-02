import * as config from '../config'

export const exec = docClient => async (path: string[], body) => {
  const { meta, creator } = body || {}

  if (!meta || !creator) throw { statusCode: 400 }

  const params = {
    TableName: config.table.safe,
    Expected: { id: { Exists: false } },
    Item: {
      id: path[1],
      transactions: [],
      users_: [creator],
      meta: meta,
    },
  }

  return await docClient
    .put(params)
    .promise()
    .then(() => null)
    .catch(err => {
      switch (err.name) {
        case 'ConditionalCheckFailedException':
          return Promise.reject({
            statusCode: 409,
            message: 'entity already exists',
          })
      }

      return Promise.reject()
    })
}
