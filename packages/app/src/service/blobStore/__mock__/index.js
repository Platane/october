const { create } = require('./create')

const blobStore = create()

module.exports = { ...blobStore, create }
