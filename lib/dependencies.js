import { createContainer, asFunction, asValue } from 'awilix'

import createApp from './app'
import createHealthChecks from './health'
import createMetricDefs from './metrics'
import registerLifecycle from './lifecycle'

export default ({ config, log } = {}) => {
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
