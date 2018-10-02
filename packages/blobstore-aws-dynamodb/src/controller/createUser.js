import * as config from '../config'

export const exec = docClient => async (path: string[], body) => {
  const { user } = body || {}

  if (!user) throw { statusCode: 400 }

  const { Item } = await docClient
    .get({
      TableName: config.table.safe,
      Key: { id: path[1] },
    })
    .promise()

  if (!Item) throw { statusCode: 404 }

  return await docClient
    .update({
      TableName: config.table.safe,
      Key: {
        id: path[1],
      },
      UpdateExpression: 'set users_ = :users',
      ConditionExpression: 'size(users_) = :usersLength',
      ExpressionAttributeValues: {
        ':users': [...Item.users_, user],
        ':usersLength': Item.users_.length,
      },
    })
    .promise()
    .then(() => null)
    .catch(err => {
      switch (err.name) {
        case 'ConditionalCheckFailedException':
          return Promise.reject({
            statusCode: 409,
            message: 'race condition',
          })
        default:
          console.log(err)
      }

      return Promise.reject()
    })
}
