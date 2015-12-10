class RAF extends Factory

	id_animloop = null
	running = off

	constructor: ->

		event = {}

		Happens( event )

		start = ->

			return if running

			running = on

			id_animloop = window.requestAnimationFrame animloop

		stop = ->

			window.cancelAnimationFrame id_animloop
			
			id_animloop = null
			running     = off

		animloop = ( ) =>
	 
			id_animloop = window.requestAnimationFrame animloop

			event.emit 'tick'

		return {
			event: event
			start: start
			stop: stop
		}

	