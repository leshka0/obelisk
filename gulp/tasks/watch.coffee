gulp 	    = require 'gulp'
livereload  = require 'gulp-livereload'
source      = require 'vinyl-source-stream'
handleError = require '../util/handle_error'

production  = process.env.NODE_ENV is 'production'

# Files to watch
paths =
	templates: require('./templates').paths
	styles: require('./styles').paths
	vendor: require('./vendor').paths
	scripts: require('./scripts').paths

gulp.task "watch", ->

	gulp.watch paths.templates.source, ['templates']
	gulp.watch paths.styles.watch, ['styles']
	gulp.watch paths.vendor.watch, ['vendor']
	gulp.watch paths.scripts.watch, ['scripts']
