import path from 'path'
import { promisify } from 'util'

export default async (configFactory, root = '../') => {
  const config = await getConfig(configFactory)
  const dataPath = path.resolve(__dirname, root, 'data')
  const logRedaction = config.get('logRedaction') || {}

  configFactory.addOverride({
    log: {
      redact: { paths: [].concat.apply([], Object.values(logRedaction)) }
    }
  })

  configFactory.addOverride({
    data: {
      path: dataPath
    }
  })

  configFactory.addOverride({
    koa: {
      favicon: {
        path: path.resolve(dataPath, 'favicon.ico')
      }
    }
  })
}

const getConfig = (configFactory) =>
  promisify((...args) => configFactory.create(...args))()
