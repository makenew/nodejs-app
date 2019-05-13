import test from 'ava'
import { httpGetJson } from '@meltwater/mlabs-koa'

import { loadConfig } from '../server/index'

test.beforeEach(async t => {
  const config = await loadConfig()
  t.context.httpOptions = {
    port: config.get('port')
  }
})

test('get health', async t => {
  const res = await httpGetJson({
    ...t.context.httpOptions,
    path: '/health'
  })
  t.snapshot(res)
})
