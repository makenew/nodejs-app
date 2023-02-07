import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

import test from 'ava'

import { boot } from '../server/index.js'

const readFileAsync = promisify(fs.readFile)

test('creates server config', async (t) => {
  const fixture = await readFileAsync(path.resolve('fixtures', 'server.json'))

  const configFactory = await new Promise((resolve) =>
    boot((run, configFactory) => resolve(configFactory))
  )
  const configAsync = promisify(configFactory.create.bind(configFactory))
  const config = await configAsync()

  t.deepEqual(
    {
      name: config.get('pkg:name')
    },
    JSON.parse(fixture)
  )

  t.regex(config.get('data:path'), /data$/)
  t.regex(config.get('koa:favicon:path'), /data\/favicon.ico$/)
})
