# csstime-gulp-tasks
Prepared Gulp tasks to build your project.

```
npm install csstime-gulp-tasks
```

If your project has following structure you can use these tasks or some of them.

```
gulpfile.js
assets/ #always stored in a repository
├──fonts/
├──favicon.ico
├──robots.txt
└──...
public/ #destination directory for built project
└──assets/
	└──componentA
		├──sprites
		├──less
		└──svg
	└──componentB
		├──sprites
		├──less
		└──svg
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
| `csstime-publish-assets`	| Publish main assets (`/assets`) to destination directory (`/public`) without any changes |
| `csstime-compile-less`	| Publish compiled from less styles to destination directory (`/public`) with name style.css |

Additional tasks which work with temporary directory:

| Name						| Description										|
|---------------------------|---------------------------------------------------|
| `csstime-concat-less`		| Save style.less file with import-links to style.less for all components |