import test from 'ava'
import { clean, serve, build, deploy, init } from '..'

// TODO: Implement module test
test('default', t => {
  t.truthy(clean)
  t.truthy(serve)
  t.truthy(build)
  t.truthy(deploy)
  t.truthy(init)
})
