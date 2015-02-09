# csstime-gulp-tasks
Gulp tasks to build your project.

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

To require these tasks use plugin `gulp-task-loader`.

Available tasks:
`csstime-publish-assets` - publish main assets (`/assets`) to destination directory (`/public`) without any changes


