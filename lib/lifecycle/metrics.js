import { collectDefaultMetrics } from 'prom-client'

export const createCollectMetrics = ({
  registry,
  collectAppMetrics,
  isMetricsDisabled
}) => () => {
  if (isMetricsDisabled) return
  const register = registry
  collectDefaultMetrics({ register })
  collectAppMetrics({ register })
}
