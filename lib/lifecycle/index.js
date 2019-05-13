import { asClass, asFunction, asValue } from 'awilix'
import { Registry } from 'prom-client'

import createStart from './start'
import createStop from './stop'
import collectMetrics from './metrics'
import createHealthMonitor, { healthMethods, logHealth } from './health'

export default (container, config) => {
  container.register({
    registry: asClass(Registry).singleton(),
    isMetricsDisabled: asValue(config.get('koa:metrics:disable')),
    start: asFunction(createStart).singleton(),
    stop: asFunction(createStop).singleton(),
    healthMethods: asValue(healthMethods(config.get('health'))),
    healthMonitor: asFunction(createHealthMonitor).singleton(),
    logHealth: asFunction(logHealth).singleton(),
    collectMetrics: asFunction(collectMetrics).singleton()
  })
}
