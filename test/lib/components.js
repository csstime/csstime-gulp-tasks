'use strict';

var path = require('path'),
	assert = require('assert'),
	components = require('../../lib/components'),
	config = require('../../default.config.json');

var TEST_COMPONENTS_DIR = 'test/mocks/app/src/components',
	TEST_COMPONENTS_PATHS = [
		'document',
		'elements/icon',
		'elements/logo',
		'layout/content',
		'layout/footer',
		'layout/header'
	];

describe('lib/components.js', function () {
	describe('getAssetsDirectories()', function () {

		it('should return empty array', function (done) {
			config.componentsRootDirs = [];

			var directories = components.getAssetsDirectories(config);
			assert.deepEqual(directories, []);
			done();
		});

		it('should return empty array for zero results', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR + '1'];

			var directories = components.getAssetsDirectories(config);
			assert.deepEqual(directories, []);
			done();
		});

		it('should return directories to assets of components', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR];

			var directories = components.getAssetsDirectories(config);
			assert.deepEqual(
				directories,
				TEST_COMPONENTS_PATHS.map(function (componentPath) {
					return path.join(
						process.cwd(),
						TEST_COMPONENTS_DIR,
						componentPath,
						config.componentAssetsDir
					);
				})
			);
			done();
		});
	});
});