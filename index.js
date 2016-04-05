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

// npm
const ghUser = require('gh-user')
const rateLimit = require('rate-limit-promise')

// own
const utils = require('rollodeqc-gh-utils')
const allUsers = require('rollodeqc-gh-search-users-all')

module.exports = (query, store) => {
  if (typeof store !== 'object') { store = {} }
  return allUsers(query)
  .then((results) => results && results.items ? results.items : [])
  .then((items) => items.filter((i) =>
    i && i.type === 'User' && i.login && !store[i.login])
      .map((i) => i.login).sort()
  )
  .then((logins) => utils.rateLimit()
    .then((rl) => {
      const limit = rateLimit(
        5, Math.ceil(5 * (1000 * rl.rate.reset - Date.now()) / rl.rate.remaining)
      )
      return Promise.all(logins.map((i) => limit().then(() => ghUser(i))))
    })
  )
  .then((logins) => {
    logins.forEach((i) => { store[i.login] = utils.chosenFields(i) })
    return store
  })
}
