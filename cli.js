#!/usr/bin/env node
0 > 1 // see https://github.com/babel/babel-eslint/issues/163

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

var store = {}

const cli = meow([
  'Usage',
  '  $ rollodeqc-gh-users [input]',
  '',
  'Options',
  '  -t',
  '  --type Use Specify "user" or "org", otherwise search for any.',
  '',
  '  -l',
  '  --location Search location; supply as many times as needed.',
  '',
  'Examples',
  '  $ rollodeqc-gh-users',
  '  unicorns & rainbows',
  '  $ rollodeqc-gh-users ponies',
  '  ponies & rainbows'
], {
  alias: { t: 'type', l: 'location' },
  string: ['type', 'location']
})

var running = true

function isDone (wait) {
  if (typeof wait !== 'number') { wait = 100 }
  setTimeout(() => { if (running) { isDone(wait) } }, wait)
}

var query = {
  o: { string: cli.input.join(' ') },
  order: 'asc',
  sort: 'joined'
}

if (cli.flags.type) {
  query.o.type = cli.flags.type
}

if (cli.flags.location) {
  query.o.location = cli.flags.location
}

fetchUsers(query, store)
  .then((ack) => {
    console.log(JSON.stringify(ack, null, ' '))
    running = false
  })
  .catch((e) => {
    console.log('err:', e)
    running = false
  })

isDone()
