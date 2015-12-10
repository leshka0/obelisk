gulp 	 = require 'gulp'
connect  = require 'gulp-connect'

gulp.task 'server', ->
	connect.server({
		root: __dirname + '/../../public'
		port: 3000
		fallback: __dirname + '/../../public/index.html'
	})
