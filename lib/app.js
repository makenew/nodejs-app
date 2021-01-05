import Koa from 'koa'

export const createApp = () => {
  const app = new Koa()
  return app
}
