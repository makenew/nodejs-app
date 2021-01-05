export const createStart = ({ logHealth, collectMetrics } = {}) => async () => {
  logHealth()
  collectMetrics()
}
