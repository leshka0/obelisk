class Fog extends Factory

	constructor: ( GUI, Cameras, Utils ) ->

		# GUI.open()

		FOG_IN_DEFAULT = 0.0002
		FOG_OUT_DEFAULT = 0.00226
		DURATION = 1

		controller =
			percent: 0 # transition
			fog: 0.002

		fog = new THREE.FogExp2( 0x000000, FOG_IN_DEFAULT )

		folder = GUI.addFolder('fog')

		# folder.open()

		folder.add( fog, 'density', 0, 0.01 ).listen()
		folder.add( controller, 'percent', 0, 1 ).listen()
		folder.add( controller, 'fog', 0, 0.1 )

		fadeIn = ->

			params =
				percent: 1
				onUpdate: => update()

			TweenMax.to(controller, DURATION, params)

		fadeOut = ->

			params =
				percent: 0
				onUpdate: => update()

			TweenMax.to(controller, DURATION, params)

		zero = new THREE.Vector3()
		cameraPosition = new THREE.Vector3()

		update = ->

			cameraPosition.set(Cameras.user.position.x, 0, Cameras.user.position.z)

			distance = cameraPosition.distanceTo(zero)

			percent = 1 - (distance / 3500)
			percent = THREE.Math.clamp(percent, 0, 1)

			fog.density = (percent * controller.fog) * controller.percent

		return {
			fog: fog
			fadeIn: fadeIn
			fadeOut: fadeOut
			update: update
		}