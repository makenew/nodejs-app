import {
  createHealthMonitor,
  healthLogging
} from '@meltwater/mlabs-health'

const createHealthy = ({
  maxUnhealthyDuration
} = {}) => ({
  healthy,
  unhealthy,
  duration
}) => {
  if (unhealthy && duration >= maxUnhealthyDuration) return false
  return true
}

export const healthMethods = options => ({
  health: createHealthy(options)
})

export const logHealth = ({
  log,
  healthMonitor
}) => () => healthLogging({
  log: log.child({ isHealthLog: true, isAppLog: false }),
  healthMonitor
})

export default ({ healthChecks }) => createHealthMonitor(healthChecks)
