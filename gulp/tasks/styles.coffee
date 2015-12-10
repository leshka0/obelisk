config      = require '../../package.json'
gulp 	    = require 'gulp'
gulpif 	    = require 'gulp-if'
sass 		= require 'gulp-sass'
sourcemaps  = require 'gulp-sourcemaps'
CSSmin      = require 'gulp-minify-css'
prefix      = require 'gulp-autoprefixer'
handleError = require '../util/handle_error'
browserSync = require 'browser-sync'
rename      = require 'gulp-rename'

development = process.env.NODE_ENV is 'development'
production  = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/sass/site.scss'
	watch: './src/**/*.scss'
	destination: '../public/css/'
	release: "site.min.#{config.version}.css"

gulp.task 'styles', ->

	gulp.src exports.paths.source

		.pipe(sass({
			sourceComments: 'map',
			sourceMap: 'sass',
			outputStyle: 'nested'
		}).on('error', sass.logError))
		  .pipe gulp.dest exports.paths.destination
		  .pipe gulpif development, browserSync.stream()

	if production
		gulp.src(exports.paths.destination + 'site.css')
			.pipe CSSmin()
			.pipe(rename(exports.paths.release))
			.pipe(gulp.dest(exports.paths.destination))
