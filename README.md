# csstime-gulp-tasks

Prepared Gulp tasks to build your project.

[![Join the chat at https://gitter.im/csstime/csstime-gulp-tasks](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/csstime/csstime-gulp-tasks?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

```
npm install csstime-gulp-tasks
```

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

csstime.loadGulpTasks(gulp, config);
```

Here is available tasks which you can see after `gulp --tasks`:

High level tasks:

| Name						| Dependencies																												|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `csstime-mode-release`	| `csstime-process-static`,<br>`csstime-process-assets`,<br>`csstime-minify-css`,<br>`csstime-remove-tmp`					|
| `csstime-mode-debug`		| `csstime-process-static`,<br>`csstime-process-assets`																		|
| `csstime-mode-watch`		| `csstime-process-static`,<br>`csstime-process-assets`																		|

Combining tasks:

| Name						| Dependencies																															|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `csstime-process-static`	| `csstime-copy-static`																													|
| `csstime-process-assets`	| `csstime-handle-css`,<br>`csstime-collect-images`,<br>`csstime-collect-fonts`,<br>`csstime-collect-svg`,<br>`csstime-collect-other`	|

Low level tasks:

| Name						| Direction and description																				| Result																|
|---------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `csstime-copy-static`		| `/static` => `/public/static`<br>Copy static files without any changes								| same files															|
| `csstime-collect-sprites`	| `/public/assets/*/sprites` => `/public`<br>Build and optimize sprites									| `__csstime-tmp/sprites.less`,<br>`static/assets/sprites.png`			|
| `csstime-collect-images`	| `/public/assets/*/images` => `/public/static/assets/*/images`<br>Copy and optimize images				| optimized images														|
| `csstime-collect-fonts`	| `/public/assets/*/fonts` => `/public/static/assets/*/fonts`<br>Copy fonts								| same fonts															|
| `csstime-collect-svg`	    | `/public/assets/*/svg` => `/public/static/assets/*/svg`<br>Copy svg, optimise and rasterize them		| optimised svg, png fallbacks											|
| `csstime-collect-other`	| `/public/assets/*/other` => `/public/static/assets/*/other`<br>Copy files								| same files															|
| `csstime-concat-less`		| `/public/assets/*/less` => `/public/__csstime-tmp`<br>Create main less file with import references	| `styles.less`															|
| `csstime-compile-less`	| `/public/__csstime-tmp` => `/public/static`<br>Compile less											| compiled `styles.css`													|
| `csstime-handle-css`		| `/public/assets/*/css` => `/public/static`<br>Collect styles.css<br>`/public/static` => `/public/static`<br>Handle css (postcss processes), add Normalize.css	| append styles from `assets/*/css`<br>and processed `styles.css`	|
| `csstime-minify-css`		| `/public/static` => `/public/static`<br>Minify css (csso)												| minified `styles.css`													|
| `csstime-minify-js`		| `/public/static` => `/public/static`<br>Minify js (uglify)											| minified `*.js`														|
| `csstime-remove-tmp`		| `/public/__csstime-tmp`<br>Remove temporary files														| 																		|
| `csstime-remove-tmp-styles`| `/public/__csstime-tmp/styles.less`<br>Remove tmp styles files			                            | 																		|
| `csstime-remove-tmp-sprites`| `/public/__csstime-tmp/sprites.less`<br>Remove tmp sprites files	                                | 																		|
| `csstime-clean`			| `/public/__csstime-tmp`,<br>`/public/static`<br>Remove created directories							| 																		|
| `csstime-exec-csscomb`	| `/catberry_components`<br>Refactor styles																| updated styles														|

Also you can pass custom config in `csstime.loadGulpTasks(gulp, config);` to override default params:
```javascript
{
	"packagePath": "node_modules/csstime-gulp-tasks",

	"componentsRootDirs": ["src/components"],
	"componentAssetsDir": "assets",

	"staticRootDir": "static",

	"destinationDir": "build",
	"temporaryDir": "__csstime-tmp",

	"spritesDir": "sprites",
	"imagesDir": "images",
	"svgDir": "svg",
	"fontsDir": "fonts",
	"lessDir": "less",
	"cssDir": "css",
	"otherDir": "other",

	"stylesFileName": "styles",
	"spritesFileName": "sprites",

	"indexComponentName": "document", // "document" styles will be above other components styles in styles.css

    "useNotify": true, // show notifications in watch mode
	"useImageSprites": true, // see gulp.spritesmith
	"useImageOptimization": true, // see gulp-imagemin
	"useSvgOptimization": true, // see gulp-imagemin (svgo)
	"useSvgRasterization": true, // see gulp-svg2png
	"useNormalizeCss": false, // see normalize.css
	"usePostCSS": true, // autoprefixer, opacity, filters
	"enableCssStructureMinimization": false, // see gulp-csso

    "watchInterval": 1000,

	"banner": "/**\n * csstime\n * <%now%>\n */\n", // header in styles.css, see gulp-header

	"cdnPath": "/static/assets/", // used in urls for sprites in css

	"imageminConfig": {}, // see ./configs files
	"postcssConfig: {},
	"spritesmithConfig": {},
	"csscombConfig": {}
}
```

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
	└──assets/
		├──sprites.png
		└──document/ #without less, css, sprites
			├──other/
			├──fonts/
			├──images/
			└──svg/
		└──componentA/
			└──svg/

```