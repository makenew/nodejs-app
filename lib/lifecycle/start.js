export default ({ logHealth, collectMetrics } = {}) => async () => {
  logHealth()
  collectMetrics()
}
