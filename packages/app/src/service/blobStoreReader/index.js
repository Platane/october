const { create } = require('./create')
const blobStore = require('~/service/blobStore')

const blobStoreReader = create(blobStore)

module.exports = { ...blobStoreReader, create }
