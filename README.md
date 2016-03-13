# csstime-gulp-tasks

[![Join the chat at https://gitter.im/csstime/csstime-gulp-tasks](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/csstime/csstime-gulp-tasks?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Prepared Gulp tasks to build and optimize assets for your project (SASS, LESS, CSS, SVG, images, sprites and more).
Themes are supported via separated additional css-bundles.

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
* gulp-sass,
* gulp-postcss,
* gulp-svgstore,
* gulp-uglify,
* gulp.spritesmith,
* node-notifier,
* normalize.css,
* pleeease-filters,
* postcss-opacity.

If your project has following structure you can use these tasks or some of them.
`component.json` should have "name" of component.

```
gulpfile.js
static/ #always stored in a repository
├──favicon.ico
├──robots.txt
└──...
src/ #source directory
└──components/
	└──document/
		├──component.json
		└──assets
			├──other/
			├──fonts/
			├──images/
			├──sprites/
			└──sass/
				└──themes/
					└──mobile.scss
				└──styles.scss
			├──svg/
			└──symbols/
				├──icon1.svg
				└──icon2.svg
	└──componentA/
		├──component.json
		└──assets
			├──sprites/
			└──sass/
				└──themes/
					└──mobile.scss
				└──styles.scss
			├──svg/
			└──symbols/
				├──icon3.svg
				└──icon4.svg
	└──componentB/
		├──component.json
		└──assets
			└──css/
				└──styles.css
```

Example App with such structure you can find here [csstime-example](https://github.com/csstime/csstime-example).

Just write this in your `gulpfile.js`:
```javascript
'use strict';

var gulp = require('gulp'),
    config = {}, // custom config
    csstime = require('csstime-gulp-tasks');

config.useSvgSymbols = true; // custom configuration
config.themedStylesFileNames = ['mobile']; // separated themes
csstime.loadGulpTasks(gulp, config);
```

You can pass custom config in `csstime.loadGulpTasks(gulp, config);` to override default params.
Learn more about default params in [configs documentation](/doc/configs.md).

Here is available high level tasks which you can see for `gulp --tasks`:

| Name						| Action																		|
|---------------------------|-------------------------------------------------------------------------------|
| `csstime-mode-release`	| Build, optimize and minify all assets. Remove temporary files.				|
| `csstime-mode-debug`		| Collect and build assets. You can analyze temporary files.					|
| `csstime-mode-watch`		| Watch changing files and run in debug mode									|
| `csstime-exec-csscomb`	| Execute csscomb																|
| `csstime-clean`			| Clear destination directory													|

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
	└──themes/
		└──mobile.css
	└──components/
		├──sprites.png
		├──symbols.svg
		└──document/ #without sass, css, sprites
			├──other/
			├──fonts/
			├──images/
			└──svg/
		└──componentA/
			└──svg/

```

Learn how to migrate from version 3 to version 4 [here](/doc/migrations.md).
