import * as config from '../config'

export const exec = docClient => async (path: string[]) => {
  const params = {
    TableName: config.table.safe,
    Key: { id: path[1] },
  }

  const { Item } = await docClient.get(params).promise()

  if (!Item) throw { statusCode: 404 }

  const { users_, ...x } = Item

  return {
    ...x,
    users: users_,
  }
}
