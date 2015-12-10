class Responsive extends Factory

	constructor: ( $window, Win ) ->

		mobileWidth  = 768
		tabletWidth  = 1025
		
		@mobile  	 = false
		@tablet  	 = false
		@desktop 	 = false
		@orientation = 'portrait'
		@landscape   = false
		@portrait    = false

		@resize = =>

			@mobile  = false
			@tablet  = false
			@desktop = false

			if Win.width < mobileWidth
				@mobile = true
			else if Win.width < tabletWidth
				@tablet = true
			else
				@desktop = true

			return {
				mobile: @mobile
				tablet: @tablet
				desktop: @desktop
			}

		@orientationchange = =>

			orientation = window.orientation or window.mozOrientation or window.msOrientation or 0
			orientation = Math.abs orientation

			if orientation is 90
				@orientation = 'landscape'
				@landscape   = true
				@portrait    = false
			else
				@orientation = 'portrait'
				@portrait    = true
				@landscape   = false

		Win.on('resize', @resize)
		Win.on('orientationchange', @orientationchange)

		@resize()
		@orientationchange()

		return @