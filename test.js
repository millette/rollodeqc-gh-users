'use strict'
import test from 'ava'
import fn from './'

test('acc', async t => {
  let store = await fn('tremblay')
  t.is(Object.keys(store).length, 190)
  store = await fn('veronique', store)
  t.is(Object.keys(store).length, 95)
})
