'use strict';
const cliCursor = require('cli-cursor');
const wrapAnsi = require('wrap-ansi');
const stringWidth = require('string-width');

const main = stream => {
  let prevLineCount = 0;

  const render = function () {
	cliCursor.hide();
	let out = [].join.call(arguments, ' ') + '\n';
	out = wrapAnsi(out, process.stdout.columns || 80, { wordWrap: false });
	stream.write(render.eraseLines(prevLineCount) + out);
	prevLineCount = render.realLines(out);
  };
  render.realLines = (str) => {
	let lines = 0;
	for (const line of str.split('\n')) {
	  lines += Math.ceil(stringWidth(line) / process.stdout.columns);
	}

	return lines;
  };
  render.eraseLines = (lines) => {
	let eraser = '';
	for (let i = 0; i <= lines; i++) {
	  eraser += '\u001b[2K\u001b[K';
	  if (i < lines) {
		eraser += '\u001b[1A';
	  }
	}
	return eraser;
  };
  render.clear = () => {
	stream.write(render.eraseLines(prevLineCount));
	prevLineCount = 0;
  };

  render.done = () => {
	prevLineCount = 0;
	cliCursor.show();
  };

  return render;
};

module.exports = main(process.stdout);
module.exports.stderr = main(process.stderr);
module.exports.create = main;
