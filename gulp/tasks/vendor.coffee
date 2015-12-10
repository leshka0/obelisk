config         = require '../../package.json'
gulp   		   = require 'gulp'
gulpif         = require 'gulp-if'
concat 		   = require 'gulp-concat'
uglify         = require 'gulp-uglify'
mainBowerFiles = require 'main-bower-files'
handleError    = require '../util/handle_error'
rename         = require 'gulp-rename'

production = process.env.NODE_ENV is 'production'

exports.paths =
	source: mainBowerFiles({
		"overrides": {
			"bootstrap": {
				"ignore": true # I customized the modal
			}
		}
	})
	destination: './public/js/'
	filename: 'vendor.js'
	release: "vendor.min.#{config.version}.js"

exports.paths.source = exports.paths.source.concat [
	__dirname + '/../../bower_components/dat-gui/build/dat.gui.js'
	__dirname + '/../../bower_components/angular-xml2json/angular-xml2json.js'
	__dirname + '/../../bower_components/happens/index.js'
	__dirname + '/../../src/vendor/bootstrap.js'
	__dirname + '/../../src/vendor/Wagner.js'
	__dirname + '/../../src/vendor/Wagner.base.js'
	__dirname + '/../../src/vendor/dolly.js'
	__dirname + '/../../src/vendor/OrbitControls.js'
	__dirname + '/../../src/vendor/jquery-ui-draggable.js'
	__dirname + '/../../src/vendor/jquery.imageMask.js'
	__dirname + '/../../src/vendor/share.js'
	__dirname + '/../../src/vendor/fulltilt.js'
	__dirname + '/../../src/vendor/bowser.js'
]

gulp.task 'vendor', ->

	if production
		filename = exports.paths.release
	else
		filename = exports.paths.filename

	gulp
		.src exports.paths.source
		.pipe concat filename
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif production, uglify()
		.on 'error', handleError
