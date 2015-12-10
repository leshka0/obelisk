window.DragIOWebgl = class DragIO

	constructor: ( element, device ) ->

		Happens(@)

		@mouseX 	   = 0
		@mouseY 	   = 0
		@mouseLastX    = 0
		@mouseLastY    = 0
		@normalX 	   = 0
		@normalY 	   = 0
		@normalCenterX = 0.1
		@normalCenterY = 0.1
		@clickedX 	   = 0
		@clickedY 	   = 0
		@relativeX 	   = 0
		@relativeY 	   = 0
		@isDown 	   = false 

		directionX = ''
		directionY = ''

		@velocityX  = 0
		@velocityY  = 0
		@_velocityX = 0
		@_velocityY = 0

		@positionY = 0

		@rotation = 
			x: 0
			y: 0

		@isDragging = false

		@enabled = false

		desktopMousemoveTimeout = null
		@desktopMousemoveEnabled = true

		velocityXScalar = if device then 5 else 1
		velocityYScalar = if device then 0.05 else 0.009

		onClick = ( event ) =>

			@clickedX = event.clientX
			@clickedY = event.clientY

			@normalX = ( event.clientX / window.innerWidth ) * 2 - 1;
			@normalY = - ( event.clientY / window.innerHeight ) * 2 + 1;

			element.removeClass('dragging')

			@emit('click')

		onMouseDown = =>

			return unless @enabled

			@emit('mousedown')

		onMouseUp = =>

			element.removeClass('dragging')

			return unless @enabled

			@emit('mouseup')

		onPanStart = ( event ) =>

			element.addClass('dragging')

			@desktopMousemoveEnabled = false

			@isDown = true

			TweenMax.killTweensOf @

			@clickedX = event.center.x
			@clickedY = event.center.y

			@relativeX = 0
			@relativeY = 0

		onPanEnd = ( event ) =>

			element.removeClass('dragging')

			@isDown = false

			TweenMax.killTweensOf @

			params =
				_velocityX: 0
				_velocityY: 0

			TweenMax.to(@, 1, params)

			clearInterval desktopMousemoveTimeout

			desktopMousemoveTimeout = setTimeout =>
				@desktopMousemoveEnabled = true
			, 1500

		onInput = ( event ) =>

			if event.distance > 0
				@isDragging = true
			else
				@isDragging = false

			if event.direction is 2
				directionX = 'left'
			else
				directionX = 'right'

			@velocityX = event.velocityX * velocityXScalar
			
			@velocityY = event.deltaY / 200
			@velocityY = THREE.Math.clamp(@velocityY, -1, 1)
			@_velocityY = @velocityY * velocityYScalar
			
			@mouseLastX = @mouseX
			@mouseLastY = @mouseY

			@mouseX = event.center.x
			@mouseY = event.center.y

			@relativeX = @mouseX - @clickedX
			@relativeY = @mouseY - @clickedY

			if @mouseX > @clickedX
				directionX = 'right'
			else
				directionX = 'left'

			if @mouseY > @clickedY
				directionY = 'up'
			else
				directionY = 'down'

		onMouseMove = ( event ) =>

			return unless @enabled
			return if @isDown
			return unless @desktopMousemoveEnabled

			@clickedX = event.clientX
			@clickedY = event.clientY

			@normalX = ( event.clientX / window.innerWidth ) * 2 - 1
			@normalY = - ( event.clientY / window.innerHeight ) * 2 + 1

			@emit 'mousemove'

		@update = =>

			if @isDown
				@_velocityX = @velocityX * 0.025

			@rotation.x += @_velocityX
			@rotation.y += @_velocityY

			@rotation.y = THREE.Math.clamp(@rotation.y, 0, 1)

		@enable = -> @enabled = true 
		@disable = -> @enabled = false 

		mc = new Hammer(element.get(0))

		mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })

		mc.on('panstart', onPanStart)
		mc.on('panend', onPanEnd)
		mc.on('hammer.input', onInput)

		element.on('click', onClick)
		element.on('mousedown', onMouseDown)
		element.on('mousemove', onMouseMove)
		element.on('mouseup', onMouseUp)
