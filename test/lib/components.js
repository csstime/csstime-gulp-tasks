'use strict';

var path = require('path'),
	assert = require('assert'),
	components = require('../../lib/components'),
	config = require('../../default.config.json');

var TEST_COMPONENTS_DIR = 'test/mocks/app/src/components',
	FAKE_DIR = TEST_COMPONENTS_DIR + 'fake',
	TEST_COMPONENTS_PATHS = [
		'document',
		'elements/icon',
		'elements/logo',
		'layout/content',
		'layout/footer',
		'layout/header'
	];

describe('lib/components.js', function () {

	describe('getAssetsGlobPatterns()', function () {

		it('should return empty array', function (done) {
			config.componentsRootDirs = [];

			var patterns = components.getAssetsGlobPatterns(config);
			assert.deepEqual(patterns, []);
			done();
		});

		it('should return array with single pattern', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR];

			var patterns = components.getAssetsGlobPatterns(config, null);
			assert.deepEqual(
				patterns,
				[
					path.join(
						process.cwd(),
						TEST_COMPONENTS_DIR,
						'**',
						config.componentAssetsDir
					)
				]
			);
			done();
		});

		it('should return array with two patterns', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR, FAKE_DIR];

			var patterns = components.getAssetsGlobPatterns(config, null);
			assert.deepEqual(
				patterns,
				[
					path.join(
						process.cwd(),
						TEST_COMPONENTS_DIR,
						'**',
						config.componentAssetsDir
					),
					path.join(
						process.cwd(),
						FAKE_DIR,
						'**',
						config.componentAssetsDir
					)
				]
			);
			done();
		});

		it('should return array with single pattern for subdir', function (done) {
			config.componentsRootDirs = [TEST_COMPONENTS_DIR];

			var patterns = components.getAssetsGlobPatterns(config, config.lessDir);
			assert.deepEqual(
				patterns,
				[
					path.join(
						process.cwd(),
						TEST_COMPONENTS_DIR,
						'**',
						config.componentAssetsDir,
						config.lessDir
					)
				]
			);
			done();
		});
	});

	describe('getAssetsDirectories()', function () {

		it('should return empty array', function (done) {
			config.componentsRootDirs = [];

			var directories = components.getAssetsDirectories(config);
			assert.deepEqual(directories, []);
			done();
		});

		it('should return empty array for zero results', function (done) {
			config.componentsRootDirs = [FAKE_DIR];

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