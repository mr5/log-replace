# log-overwrite
 
 [![Build Status](https://travis-ci.org/mr5/terminal-overwrite.svg?branch=master)](https://travis-ci.org/sindresorhus/log-update)

> Log by overwriting the previous output in the terminal.<br>
> Useful for rendering progress bars, animations, etc.
> Forked from [log-update](https://github.com/sindresorhus/log-update)

![](screenshot.gif)

## Install

```
$ npm install --save log-update
```


## Usage

```js
const logUpdate = require('log-update');
const frames = ['-', '\\', '|', '/'];
let i = 0;

setInterval(() => {
	const frame = frames[i = ++i % frames.length];

	logUpdate(
`
        ♥♥
   ${frame} unicorns ${frame}
        ♥♥
`
	);
}, 80);
```


## API

### logUpdate(text, ...)

Log to stdout.

### logUpdate.clear()

Clear the logged output.

### logUpdate.done()

Persist the logged output.<br>
Useful if you want to start a new log session below the current one.

### logUpdate.stderr(text, ...)

Log to stderr.

### logUpdate.stderr.clear()
### logUpdate.stderr.done()

### logUpdate.create(stream)

Get a `logUpdate` method that logs to the specified stream.

## License

* MIT © [Dyson Woo](https://github.com/mr5)
* MIT © [Sindre Sorhus](https://sindresorhus.com)
