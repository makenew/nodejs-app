import { httpGetJson } from '@meltwater/mlabs-koa'
import test from 'ava'

import { loadConfig } from '../server/index.js'

test.beforeEach(async (t) => {
  const config = await loadConfig()
  t.context.port = config.get('port')
})

test('get health', async (t) => {
  const { port } = t.context
  const res = await httpGetJson(`http://localhost:${port}/health`)
  t.snapshot(res)
})
