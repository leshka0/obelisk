config      = require '../../package.json'
gulp 		= require 'gulp'
webpack     = require 'gulp-webpack'
uglify      = require 'gulp-uglify'
gulpif      = require 'gulp-if'
coffee 		= require 'gulp-coffee'
classify    = require 'gulp-ng-classify'
concat 		= require 'gulp-concat'
handleError = require '../util/handle_error'
rename      = require 'gulp-rename'
browserSync = require 'browser-sync'

development = process.env.NODE_ENV is 'development'
production  = process.env.NODE_ENV is 'production'
base_path   = process.env.PWD

exports.paths =
	source: './src/coffee/**/*.coffee'
	watch: './src/coffee/**/*.coffee'
	destination: './public/js/'
	filename: 'app.js'
	release: "app.min.#{config.version}.js"

gulp.task 'scripts', ->

	if production
		filename = exports.paths.release
	else
		filename = exports.paths.filename

	gulp.src exports.paths.source

		.pipe(classify()).on 'error', (err) ->
			console.error "coffee error! #{err.message} #{err.filename} line: #{err.location.first_line}"
			@emit 'end'
		.pipe coffee bare: false
		.pipe concat exports.paths.filename
		.pipe gulpif production, uglify()
		.pipe rename filename
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, browserSync.stream()
