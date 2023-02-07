import { asClass, asFunction, asValue } from 'awilix'
import { Registry } from 'prom-client'

import { createHealthMonitor, healthMethods, logHealth } from './health.js'
import { createCollectMetrics } from './metrics.js'
import { createStart } from './start.js'
import { createStop } from './stop.js'

export const registerLifecycle = (container, config) => {
  container.register({
    registry: asClass(Registry).singleton(),
    isMetricsDisabled: asValue(config.get('koa:metrics:disable')),
    start: asFunction(createStart).singleton(),
    stop: asFunction(createStop).singleton(),
    healthMethods: asValue(healthMethods(config.get('health'))),
    healthMonitor: asFunction(createHealthMonitor).singleton(),
    logHealth: asFunction(logHealth).singleton(),
    collectMetrics: asFunction(createCollectMetrics).singleton()
  })
}
