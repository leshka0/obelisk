class Timeline extends Factory

	constructor: ( GUI, RAF ) ->

		@percent   = 0
		@startTime = ''
		@endTime   = ''
		@nowTime   = ''
		@duration  = 10

		folder = GUI.addFolder('timeline')

		folder.open()

		startTime = moment(env.TIMELINE.START, 'YYYY-MM-DD HH:mm:ss')
		endTime   = moment(env.TIMELINE.END, 'YYYY-MM-DD HH:mm:ss')

		folder.add(@, 'startTime').listen()
		folder.add(@, 'endTime').listen()
		folder.add(@, 'nowTime').listen()
		folder.add(@, 'percent', 0, 1).listen()

		@startTime = startTime._d
		@endTime   = endTime._d

		@startUpdate = -> RAF.start()
		@stopUpdate = -> RAF.stop()

		@playTransition = =>

			@stopUpdate()

			currentStartTime = @startTime
			currentEndTime   = @endTime

			start = moment().seconds(0)
			end   = moment(start).add(1, 'minute')

			startTime = start.format('YYYY-MM-DD HH:mm:ss')
			endTime   = end.format('YYYY-MM-DD HH:mm:ss')

			@percent = 0

			params =
				percent: 1
				ease: Linear.easeNone
				onComplete: =>

					# Reset
					startTime = currentStartTime
					endTime   = currentEndTime

					@startUpdate()

			TweenLite.to( @, @duration, params )

		@stopTransition = =>

		@update = =>

			now = moment()

			@now = now.unix()

			start = startTime.unix()
			end   = endTime.unix()

			@percent = (@now - start) / (end - start)

			@percent = THREE.Math.clamp( @percent, 0, 1 )

			@percent = 1 unless env.PHASE is '1'
			@percent = 0

		folder.add(@, 'playTransition')
		folder.add(@, 'stopTransition')

		@update()

		# RAF.event.on('tick', @update)

		@startUpdate()

		return @
