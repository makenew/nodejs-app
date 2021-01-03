'use strict'

require('source-map-support').install()

const { boot } = require('./dist/server/index.js')

if (require.main === module) boot()
