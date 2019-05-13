import { collectDefaultMetrics } from 'prom-client'

export default ({
  registry,
  collectAppMetrics,
  isMetricsDisabled
}) => () => {
  if (isMetricsDisabled) return
  const register = registry
  collectDefaultMetrics({ register })
  collectAppMetrics({ register })
}
