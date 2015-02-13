# csstime-gulp-tasks
Prepared Gulp tasks to build your project.

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
public/ #destination directory for built project
└──assets/
	└──document/
		├──other/
		├──fonts/
		├──images/
		├──sprites/
		└──less/
			└──styles.less
		└──svg/
	└──componentA/
		├──sprites/
		└──less/
        	└──styles.less
		└──svg/
	└──componentB/
		└──css/
			└──styles.css
```

Just write this in your Gulpfile.js:
```javascript
'use strict';

var gulp = require('gulp'),
	csstime = require('csstime-gulp-tasks');

csstime.loadGulpTasks();
```

Here is available tasks which you can see after `gulp --tasks`:

| Name						| Direction and description																				| Result																|
|---------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `csstime-copy-static`		| `/static` => `/public/static`<br>Copy static files without any changes								| same files															|
| `csstime-collect-sprites`	| `/public/assets/*/sprites` => `/public`<br>Build and optimize sprites									| `__csstime-tmp/sprites.less`<br>`static/assets/sprites.png`			|
| `csstime-collect-images`	| `/public/assets/*/images` => `/public/static/assets/*/images`<br>Copy and optimize images				| optimized images														|
| `csstime-collect-fonts`	| `/public/assets/*/fonts` => `/public/static/assets/*/fonts`<br>Copy fonts								| same fonts															|
| `csstime-collect-other`	| `/public/assets/*/other` => `/public/static/assets/*/other`<br>Copy files								| same files															|
| `csstime-concat-less`		| `/public/assets/*/less` => `/public/__csstime-tmp`<br>Create main less file with import references	| `styles.less`															|
| `csstime-compile-less`	| `/public/__csstime-tmp` => `/public/static`<br>Compile less											| compiled `styles.css`													|
| `csstime-handle-css`		| `/public/static` => `/public/static`<br>Handle css (css.pleeease)										| processed `styles.css`												|
| `csstime-minify-css`		| `/public/static` => `/public/static`<br>Minify css (csso)												| minified `styles.css`													|
| `csstime-remove-tmp`		| `/public/__csstime-tmp`<br>Remove temporary files														| 																		|


Combining tasks:

| Name						| Dependencies																															|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **csstime-process-static**| `csstime-copy-static`																													|
| **csstime-process-assets**| `csstime-handle-css`,<br>`csstime-collect-images`,<br>`csstime-collect-fonts`,<br>`csstime-collect-svg`,<br>`csstime-collect-other`	|


High level tasks:

| Name						| Dependencies																												|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **csstime-mode-release**	| `csstime-process-static`,<br>`csstime-process-assets`,<br>`csstime-minify-css`,<br>`csstime-remove-tmp`					|
| **csstime-mode-debug**	| `csstime-process-static`,<br>`csstime-process-assets`																		|
| **csstime-mode-watch**	| `csstime-process-static`,<br>`csstime-process-assets`																		|