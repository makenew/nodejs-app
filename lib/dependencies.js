import { asFunction, asValue, createContainer } from 'awilix'

import { createApp } from './app.js'
import { createHealthChecks } from './health.js'
import { registerLifecycle } from './lifecycle/index.js'
import { createMetricDefs } from './metrics.js'

export const createDependencies = ({ config, log } = {}) => {
  const container = createContainer()

  container.register({
    log: asValue(log),
    healthChecks: asFunction(createHealthChecks).singleton(),
    metricDefs: asFunction(createMetricDefs).singleton()
  })

  registerLifecycle(container, config)

  container.register({
    app: asFunction(createApp).singleton()
  })

  return container
}
