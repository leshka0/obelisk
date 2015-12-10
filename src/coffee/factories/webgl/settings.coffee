class Settings extends Factory

	constructor: ( Detect ) ->

		@postProcessing = true
		@clickEvent 	= if Detect.device then 'touchstart' else 'click'

		return @
