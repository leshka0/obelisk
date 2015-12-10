class TowerPath extends Factory

	constructor: ( GUI, Cameras, Scene ) ->

		controller =
			percent: 0.1

		path = null

		folder = GUI.addFolder('tower path')

		folder.open()

		dolly = null

		setup = ( points, towerPathPoints ) ->

			###
			use points based off the tower shape instead of the json
			###
			points.camera = towerPathPoints

			dolly = new THREE.CameraDolly(Cameras.user, Scene, points, folder, true)

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

			percent = THREE.Math.clamp(percent, 0, 1)

			dolly.cameraPosition = percent
			dolly.lookatPosition = percent
			
			dolly.update()

		getPointOnCameraPath = ( percent ) ->

			return dolly.getPointOnCameraPath( percent )

		return {
			setup: setup
			updatePoints: updatePoints
			updateCameraPosition: updateCameraPosition
			getPointOnCameraPath: getPointOnCameraPath
		}