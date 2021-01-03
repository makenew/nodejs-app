import path from 'path'

import { configure, createDependencies, createServer } from './index.js'
import logFilters from './filters.js'

const defaultExec = (run, configFactory, callback) => {
  run(configFactory)
  callback()
}

const boot = (exec = defaultExec) => {
  try {
    const root =
      path.basename(path.resolve(__dirname, '../')) === 'dist'
        ? '../../'
        : '../'
    const configPath = path.resolve(__dirname, root, 'config')

    const { configFactory, run, exit, watcher, ready } = createServer({
      logFilters,
      configPath,
      createDependencies
    })

    let booted = false
    const init = () => {
      if (booted) return
      booted = true
      configure(configFactory, root)
        .then(
          () =>
            new Promise((resolve, reject) => {
              exec(run, configFactory, (err) => {
                if (err) reject(err)
                resolve()
              })
            })
        )
        .catch(exit)
    }

    watcher.on('ready', init)
    if (ready) return init()
  } catch (err) {
    console.error(err)
    process.exit(3)
  }
}

export const loadConfig = () =>
  new Promise((resolve, reject) => {
    boot((run, configFactory) => {
      try {
        configFactory.create((err, config) => {
          try {
            if (err) throw err
            resolve(config)
          } catch (err) {
            reject(err)
          }
        })
      } catch (err) {
        reject(err)
      }
    })
  })

export default boot
