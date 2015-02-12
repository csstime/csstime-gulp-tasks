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
	└──document
		├──fonts/
		├──sprites
		└──less
			└──styles.less
		└──svg
	└──componentA
		├──sprites
		└──less
        	└──styles.less
		└──svg
	└──componentB
    		└──less
            	└──styles.less
```

Just write this in your Gulpfile.js:
```javascript
'use strict';

var gulp = require('gulp'),
	csstime = require('csstime-gulp-tasks');

csstime.loadGulpTasks();
```

Here is available tasks which you can see after `gulp --tasks`:

| Name						| Description										|
|---------------------------|---------------------------------------------------|
| `csstime-copy-static	`	| Copy static files (`/static`) to public directory (`/public`) without any changes |
| `csstime-compile-less`	| Publish compiled less styles to public directory (`/public`) with name style.css |
| `csstime-handle-css`		| Handle css (css.pleeease) in public directory (`/public`) with name style.css |
| `csstime-minify-css`		| Minify css (csso) in public directory (`/public`) with name style.css |

Additional tasks which work with temporary directory:

| Name						| Description										|
|---------------------------|---------------------------------------------------|
| `csstime-concat-less`		| Save style.less file with import-links to style.less for all components |