#!/usr/bin/env node
/*
RoLLodeQc utility to fetch all GitHub users according to search.

Copyright 2016 Robin Millette <robin@millette.info> (<http://robin.millette.info>)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'
const fetchUsers = require('./')
const meow = require('meow')

let store = require('./tremblay.json')
// let store = {}

const cli = meow([
  'Usage',
  '  $ ok [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ ok',
  '  unicorns & rainbows',
  '  $ ok ponies',
  '  ponies & rainbows'
])

let running = true

function isDone (wait) {
  if (typeof wait !== 'number') { wait = 100 }
  setTimeout(() => { if (running) { isDone(wait) } }, wait)
}

// TODO: search by location, etc.
// fetchUsers({ o: { location: 'joliette' } })
fetchUsers(cli.input[0], store)
  .then((ack) => {
    console.log(JSON.stringify(ack, null, ' '))
    running = false
  })
  .catch((e) => {
    console.log('err:', e)
    running = false
  })

isDone()
