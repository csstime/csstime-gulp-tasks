# Default config in csstime-gulp-tasks

```javascript
{
	"packagePath": "node_modules/csstime-gulp-tasks",

	"componentsRootDirs": ["src/components"],
	"componentAssetsDir": "assets",

	"staticRootDir": "static",

	"destinationDir": "build",
	"destinationComponentsDir": "components",
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

	"cdnPath": "/components/", // used in urls for sprites in css

	"imageminConfig": {}, // see ./configs files or read further
	"postcssConfig: {},
	"spritesmithConfig": {},
	"csscombConfig": {}
}
```

You can pass custom configuration options in `csstime.loadGulpTasks(gulp, config);` to override default options:
```javascript
config = {
	useNotify: false,
	imageminConfig: {
		optimizationLevel: 5
	}
};
csstime.loadGulpTasks(gulp, config);
```

## Imagemin default config
To override use "imageminConfig" option.
```json
{
	"optimizationLevel": 3,
	"svgoPlugins": [
		{
			"removeHiddenElems": false
		}
	]
}
```

## PostCSS default config
To override use "postcssConfig" option.
```json
{
	"autoprefixer": {
		"browsers": ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "IE 9"],
		"cascade": true
	},
	"filters": {
		"oldIE": false
	},
	"opacity": false
}
```

## Spritesmith default config
To override use "spritesmithConfig" option.
```json
{
	"padding": 10,
	"algorithm": "binary-tree",
	"cssTemplatePath": "node_modules/csstime-gulp-tasks/configs/.sprite.less.mustache"
}
```

## Csscomb default config
To override use "csscombConfig" option.
```json
{
	"sources": "src/components",
	"configPath": "node_modules/csstime-gulp-tasks/configs/.csscomb.json"
}
```