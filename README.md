# csstime-gulp-tasks

[![Join the chat at https://gitter.im/csstime/csstime-gulp-tasks](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/csstime/csstime-gulp-tasks?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Prepared Gulp tasks to build and optimize assets of your project (LESS, CSS, SVG, images, sprites and more).

```
npm install csstime-gulp-tasks
```

List of used packages:
* autoprefixer-core,
* gulp-concat,
* gulp-csscomb,
* gulp-csso,
* gulp-header,
* gulp-imagemin,
* gulp-less,
* gulp-postcss,
* gulp-svg2png,
* gulp-uglify,
* gulp.spritesmith,
* node-notifier,
* normalize.css,
* pleeease-filters,
* postcss-opacity.

If your project has following structure you can use these tasks or some of them.

```
gulpfile.js
static/ #always stored in a repository
├──favicon.ico
├──robots.txt
└──...
src/ #source directory
└──components/
	└──document/
		└──assets
			├──other/
			├──fonts/
			├──images/
			├──sprites/
			└──less/
				└──styles.less
			└──svg/
	└──componentA/
		└──assets
			├──sprites/
			└──less/
				└──styles.less
			└──svg/
	└──componentB/
		└──assets
			└──css/
				└──styles.css
```

Just write this in your Gulpfile.js:
```javascript
'use strict';

var gulp = require('gulp'),
    config = {}, // custom config
    csstime = require('csstime-gulp-tasks');

config.useNormalizeCss = true; // custom configuration
csstime.loadGulpTasks(gulp, config);
```

You can pass custom config in `csstime.loadGulpTasks(gulp, config);` to override default params.
Learn more about default params in [configs documentation](/doc/configs.md).

Here is high level available tasks which you can see after `gulp --tasks`:

| Name						| Action																		|
|---------------------------|-------------------------------------------------------------------------------|
| `csstime-mode-release`	| Build, optimize and minify all assets. Remove temporary files.				|
| `csstime-mode-debug`		| Collect and build assets. You can analyze temporary files.					|
| `csstime-mode-watch`		| Watch changing files and run in debug mode									|
| `csstime-exec-csscomb`	| Execute csscomb																|

Learn more about all tasks in [tasks documentation](/doc/tasks.md).

After `csstime-mode-release` you will get following structure:
```
gulpfile.js
static/ #without changes
src/ #without changes
build/ #all generated files here
	├──favicon.ico
    ├──robots.txt
    ├──...
	├──styles.css
	└──components/
		├──sprites.png
		└──document/ #without less, css, sprites
			└──assets/
				├──other/
				├──fonts/
				├──images/
				└──svg/
		└──componentA/
			└──assets/
				└──svg/

```