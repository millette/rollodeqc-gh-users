'use strict'
import test from 'ava'
import fn from './'

test('acc', async t => {
  let store = await fn('tremblay')
  t.truthy(Object.keys(store).length > 200)
  t.truthy(Object.keys(store).length < 400)
  store = await fn('veronique', store)
  t.truthy(Object.keys(store).length > 100)
  t.truthy(Object.keys(store).length < 300)
})
