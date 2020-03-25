export default () => {
  const ext = process.env.SMOKE_TEST === 'true' ? 'test' : 'spec'
  return {
    files: [`**/*.${ext}.js`, '!dist/**/*', '!package/**/*'],
    require: ['@babel/register']
  }
}
