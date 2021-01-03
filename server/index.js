import boot from './boot.js'

export { createServer } from '@meltwater/mlabs-koa'

export { default as boot, loadConfig } from './boot.js'
export { default as configure } from './config.js'

if (require.main === module) boot()
