'use strict';

var gulp = require('gulp'),
	csstime = require('./index'),
	config = require('./default.config.json');

var TEST_COMPONENTS_DIR = 'test/mocks/app/src/components';

config.componentsRootDirs = [TEST_COMPONENTS_DIR];
csstime.loadGulpTasks(gulp, config);

gulp.task('test-release', ['csstime-mode-release']);

gulp.task('test-debug', ['csstime-mode-debug']);