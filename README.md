# csstime-gulp-tasks
Gulp tasks to build your project.

```
npm install csstime-gulp-tasks --save-dev
```

If your project has following structure you can use these tasks.

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

To require these tasks use `gulp-task-loader` plugin:
```
// gulpfile.js in your project
'use strict';

var gulp = require('gulp'),
	taskLoader = require('gulp-task-loader');

taskLoader('./node_modules/csstime-gulp-tasks/tasks');
```

Here is available tasks which you can see after `gulp --tasks`:

`csstime-publish-assets` - publish main assets (`/assets`) to destination directory (`/public`) without any changes


