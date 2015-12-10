class App extends App

	constructor: ->

		angular.element( document ).ready () => @load()

		# for threejs
		THREE.warn = ->
		console.warn = ->

		cls = 'phase-' + env.PHASE

		if env.PHASE isnt '1'
			cls += ' phase-live'

		$('body').addClass(cls)

		return [
			'ngAria'
			'ngRoute'
			'angularXml2json'
			'ngUpload'
			'facebook'
			'ngLodash'
			'ngAnimate'
			'ngSanitize'
			'twitterFilters'
		]

	load: ->

		app = angular.module("app");

		AssetLoader.load(Assets.all()).then( (data) =>

			# Update the assets with the loaded ones
			Assets.update(data)

			@start()

		, (error) ->

			console.log error
		)

	start: ->

		# c.enable = env.DEBUG
		c.enable = true

		angular.bootstrap document, ['app']
