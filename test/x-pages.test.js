import test from 'ava'
import xPages from '..'

// TODO: Implement module test
test('<test-title>', t => {
  const err = t.throws(() => xPages(100), TypeError)
  t.is(err.message, 'Expected a string, got number')

  t.is(xPages('w'), 'w@zce.me')
  t.is(xPages('w', { host: 'wedn.net' }), 'w@wedn.net')
})
