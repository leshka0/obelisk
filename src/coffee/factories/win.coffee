class Win extends Factory

	constructor: ( $window ) ->

		Happens @

		@width   = 0
		@height  = 0
		$$window = $($window)
		@width   = $$window.width()
		@height  = $$window.height()

		onResize = ( event ) =>

			@width  = $$window.width()
			@height = $$window.height()

			@emit('resize')

		$$window.on('resize', onResize)

		onResize()

		return @