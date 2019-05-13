'use strict'

require('source-map-support').install()

const { boot } = require('./dist/server')

if (require.main === module) boot()
