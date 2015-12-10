window.ObjectDragIOWebgl = class ObjectDragIOWebgl

	constructor: ( element, device, Win ) ->

		Happens @

		@isDown = false

		@x = 0
		@y = 0

		@enabled = false

		@activeElement = false

		@isRegister = false

		@tiltController = false

		@timeout = null

		if device

			promise = new (FULLTILT.getDeviceOrientation)('type': 'world')

			promise.then((@tiltController) =>

				).catch (message) ->
					c.error message
				(=>

			)()

		onDown = ( event ) =>

			@isDown = true

			element.addClass('dragging')

			# unless @isRegister
			event.preventDefault()

		onUp = ( event ) =>

			@isDown = false

			element.removeClass('dragging')

			@emit('release')

		onMove = ( event ) =>

			clearTimeout @timeout

			# return unless @isDown
			return unless @enabled

			x = event.pageX
			y = event.pageY

			offset = @activeElement.offset()
			width  = @activeElement.width()
			height = @activeElement.height()

			@x = ( x - offset.left) / width
			@y = ( y - offset.top) / height

			@x = THREE.Math.clamp(@x, 0, 1)
			@y = THREE.Math.clamp(@y, 0, 1)

			@emit('drag', {
				x: @x
				y: @y
			})

		element.on('mousedown', onDown)
		$('body').on('mouseup', onUp)

		if not device
			element.on('mousemove', onMove)
			element.on('mouseleave', =>

				@timeout = setTimeout onUp, 2000
			)

		@update = =>

			requestAnimationFrame(@update)

			if @tiltController

				euler = @tiltController.getScreenAdjustedEuler()
				@x 	  = euler.gamma.map(-25, 25, 0, 1)

				@emit('drag', {
					x: @x
					y: 0.5
				})

		@update()


	enable: -> @enabled = true 
	disable: -> @enabled = false 

	setActiveElement: ( @activeElement, @isRegister ) ->