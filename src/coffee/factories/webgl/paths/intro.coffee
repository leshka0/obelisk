class IntroPath extends Factory

	constructor: ( GUI, Cameras, Scene ) ->

		controller =
			percent: 0

		path = null

		folder = GUI.addFolder('intro path')

		# folder.open()

		dolly = null

		setup = ( points ) ->
			
			dolly = new THREE.CameraDolly(Cameras.user, Scene, points, folder)

			# folder.add(dolly, 'cameraPosition', 0, 1).onChange ->
			# 	dolly.update()

			# folder.add(dolly, 'lookatPosition', 0, 1).onChange ->
			# 	dolly.update()

			folder.add(controller, 'percent', 0, 1).onChange ->
				
				dolly.cameraPosition = controller.percent
				dolly.lookatPosition = controller.percent
				
				dolly.update()

			folder.add(dolly, 'exportPositions')

		updatePoints = ( points ) ->

			if dolly?

				# console.log 'update', points

				dolly.updateCameraPoints( points )

		updateCameraPosition = ( percent ) ->

			dolly.cameraPosition = percent
			dolly.lookatPosition = percent

			dolly.update()

		return {
			setup: setup
			path: path
			updatePoints: updatePoints
			updateCameraPosition: updateCameraPosition
		}