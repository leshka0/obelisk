class Cameras extends Factory

	constructor: ( GUI, $window ) ->
	
		@dev  = new THREE.PerspectiveCamera( 65, $window.innerWidth / $window.innerHeight, 0.1, 100000 )
		@user = new THREE.PerspectiveCamera( 65, $window.innerWidth / $window.innerHeight, 0.1, 100000 )

		range = 100

		@debug = false
		@rotationAngle = 0
		@positionY = 1
		@scaleXZ = 1

		Happens(@)

		update = =>

			@user.updateProjectionMatrix()


		cameraFolder = GUI.addFolder( 'camera' )
		cameraFolder.add( @, 'debug')
		# cameraFolder.add( @, 'rotationAngle', -Math.PI, Math.PI ).onChange => @emit('rotate')
		cameraFolder.add( @, 'rotationAngle', -Math.PI, Math.PI ).listen()
		cameraFolder.add( @, 'positionY', 0, 1 ).listen()
		cameraFolder.add( @, 'scaleXZ', 0, 1000 ).onChange => @emit('rotate')
		cameraFolder.add( @user.position, 'x', -range, range )
		cameraFolder.add( @user.position, 'y', -range, range )
		cameraFolder.add( @user.position, 'z', -range, range )
		# cameraFolder.add( @user, 'fov', 0, 100 ).listen()
		cameraFolder.open()

		return @