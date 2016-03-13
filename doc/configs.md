# Default config in csstime-gulp-tasks

```json
{
	"componentsRootDirs": ["src/components"],
	"componentAssetsDir": "assets",
	"componentJSON": "component.json",

	"staticRootDir": "static",

	"destinationDir": "build",
	"destinationComponentsDir": "components",
	"temporaryDir": "__csstime-tmp",

	"spritesDir": "sprites",
	"imagesDir": "images",
	"svgDir": "svg",
	"svgSymbolsDir": "symbols",
	"fontsDir": "fonts",
	"lessDir": "less",
	"sassDir": "sass",
	"cssDir": "css",
	"otherDir": "other",
	"lessThemesDir": "themes",
	"sassThemesDir": "themes",

	"preprocessor": "less",
	"preprocessorsConfig": {
		"less": {
			"ext": "less"
		},
		"sass": {
			"ext": "scss"
		}
	},

	"stylesFileName": "styles",
	"spritesFileName": "sprites",
	"svgSymbolsFileName": "symbols",
	"themedStylesFileNames": [],

	"indexComponentName": "document", // "document" styles will be above other components styles in styles.css

	"useNotify": true, // show notifications in watch mode

	"useImageSprites": true, // see gulp.spritesmith
	"useImageOptimization": true, // see gulp-imagemin

	"useSvgOptimization": true, // see gulp-imagemin (svgo)
	"useSvgSymbols": false,
   	"svgSymbolsPrefix": "icon-",

	"useNormalizeCss": false, // see normalize.css
	"usePostCSS": true, // autoprefixer, opacity, filters
	"enableCssStructureMinimization": false, // see gulp-csso
	"shouldClearDestinationDuringRelease": false,

	"watchInterval": 1000,

	"banner": "/**\n * csstime\n * <%now%>\n */\n", // header in styles.css, see gulp-header

	"cdnPath": "/components/", // used in urls for sprites in css

	"imageminConfig": {}, // see ./configs files or read further
	"postcssConfig": {},
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

If you want to clear destination directory during release process to remove deprecated files,
you can set configuration option `shouldClearDestinationDuringRelease` to `true`.

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
	"lessTemplatePath": "configs/.sprite.less.mustache",
	"sassTemplatePath": "configs/.sprite.sass.mustache"
}
```

## Csscomb default config
To override use "csscombConfig" option.
```json
{
	"sources": "src/components",
	"excludes": [],
	"configPath": "configs/.csscomb.json"
}
```

## Svgstore default config
To override use "svgstoreConfig" option.
```json
{
	"inlineSvg": true
}
```
