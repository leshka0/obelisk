require('dotenv').config(path: '.env.'+ process.env.NODE_ENV)

config 		= require '../../package.json'
path 		= require 'path'
gulp 		= require 'gulp'
jade        = require 'gulp-jade'
handleError = require '../util/handle_error'
gulpif      = require 'gulp-if'
browserSync = require 'browser-sync'

development = process.env.NODE_ENV is 'development'
staging     = process.env.NODE_ENV is 'staging'
production  = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/jade/**/*.jade'
	watch: './src/jade/**/*.jade'
	destination: './public'

gulp.task 'templates', ->

	gulp.src exports.paths.source

		.pipe(jade(
			pretty: true
			locals: {
				version: config.version
				staging: staging
				production: production
				FRONTEND_VERSION: config.version
			}
		))
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, browserSync.stream()
		.on 'error', handleError
