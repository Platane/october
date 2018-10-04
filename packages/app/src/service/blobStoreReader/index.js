const { create } = require('./create')
const blobStore = require('~/service/blobStore/__mock__')

const blobStoreReader = create(blobStore)

module.exports = { ...blobStoreReader, create }
