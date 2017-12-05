# rollodeqc-gh-users
[![Build Status](https://travis-ci.org/millette/rollodeqc-gh-users.svg?branch=master)](https://travis-ci.org/millette/rollodeqc-gh-users)
[![Coverage Status](https://coveralls.io/repos/github/millette/rollodeqc-gh-users/badge.svg?branch=master)](https://coveralls.io/github/millette/rollodeqc-gh-users?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/rollodeqc-gh-users.svg)](https://gemnasium.com/github.com/millette/rollodeqc-gh-users)
> RoLLodeQc utility to fetch all GitHub users according to search.

## New since version 0.5.0
The cli now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-rollodeqc-gh-users.json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## Install
```
$ npm install --save rollodeqc-gh-users
```

## Usage

### FIXME: readme not up to date

```js
const rollodeqcGhUsers = require('rollodeqc-gh-users');

rollodeqcGhUsers('unicorns');
//=> 'unicorns & rainbows'
```

## API
### rollodeqcGhUsers(input, [options])
#### input
Type: `string`

Lorem ipsum.

#### options
##### foo
Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## Dependencies
* gh-user
* rate-limit-promise
* rollodeqc-gh-search-users-all
* rollodeqc-gh-utils

## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)

[update-notifier]: <https://github.com/yeoman/update-notifier>
