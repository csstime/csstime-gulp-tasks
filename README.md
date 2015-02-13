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

| Name						| Direction														| Result																| Description										|
|---------------------------|---------------------------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------|
| `csstime-copy-static`		| `/static` => `/public/static`									| same files															| Copy static files without any changes				|
| `csstime-collect-sprites`	| `/public/assets/*/sprites` => `/public`						| `__csstime-tmp/sprites.less` and `static/assets/sprites.png`			| Build and optimize sprites						|
| `csstime-collect-images`	| `/public/assets/*/images` => `/public/static/assets/*/images`	| optimized images														| Copy and optimize images							|
| `csstime-collect-fonts`	| `/public/assets/*/fonts` => `/public/static/assets/*/fonts`	| same fonts															| Copy fonts										|
| `csstime-collect-other`	| `/public/assets/*/other` => `/public/static/assets/*/other`	| same files															| Copy files										|
| `csstime-concat-less`		| `/public/assets/*/less` => `/public/__csstime-tmp`			| `styles.less`															| Create main less file with import references		|
| `csstime-compile-less`	| `/public/__csstime-tmp` => `/public/static`					| compiled `styles.css`													| Compile less										|
| `csstime-handle-css`		| `/public/static` => `/public/static`							| processed `styles.css`												| Handle css (css.pleeease) 						|
| `csstime-minify-css`		| `/public/static` => `/public/static`							| minified `styles.css`													| Minify css (csso)									|
| `csstime-remove-tmp`		| `/public/__csstime-tmp`										| 																		| Remove temporary files							|


Combining tasks:

| Name						| Dependencies																															|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `csstime-process-static`	| `csstime-copy-static`																													|
| `csstime-process-assets`	| `csstime-handle-css`,<br>`csstime-collect-images`,<br>`csstime-collect-fonts`,<br>`csstime-collect-svg`,<br>`csstime-collect-other`	|


High level tasks:

| Name						| Dependencies																												|
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `csstime-mode-release`	| `csstime-process-static`,<br>`csstime-process-assets`,<br>`csstime-minify-css`,<br>`csstime-remove-tmp`					|
| `csstime-mode-debug`		| `csstime-process-static`,<br>`csstime-process-assets`																		|
| `csstime-mode-watch`		| `csstime-process-static`,<br>`csstime-process-assets`																		|