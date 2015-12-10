class THREE.Box2Helper

	constructor: ( bounds ) ->

		geometry = new THREE.Geometry()

		geometry.vertices.push( new THREE.Vector3( bounds.min.x, bounds.min.y, 0 ) )
		geometry.vertices.push( new THREE.Vector3( bounds.max.x, bounds.min.y, 0 ) )
		geometry.vertices.push( new THREE.Vector3( bounds.max.x, bounds.max.y, 0 ) )
		geometry.vertices.push( new THREE.Vector3( bounds.min.x, bounds.max.y, 0 ) )
		geometry.vertices.push( new THREE.Vector3( bounds.min.x, bounds.min.y, 0 ) )

		params =
			color: 0x00FF00
			wireframe: true
			linewidth: 50

		return new THREE.Line(geometry, new THREE.LineBasicMaterial( params ))

class ObjectZoomHelper extends Factory

	constructor: ( Scene, Cameras, GUI, Point, Detect, Responsive, Win, Utils ) ->


		size = 100

		bounds 			  = new THREE.Box2( new THREE.Vector2( -size, -size ), new THREE.Vector2( size, size ) )
		cameraLookat 	  = new THREE.Vector3( 0, 0, -1 )
		cameraEndPosition = new THREE.Vector3()
		helper 			  = new THREE.Box2Helper( bounds )

		objectPositionMarker 	   = Point.create( 10 )
		objectPositionLookAtMarker = Point.create( 10, 0x00FF00 )
		objectPositionTransitionMarker = Point.create( 10, 0x0000FF )

		if Detect.mobile

			objectPositionMarker.position.set(0, 20, 0)

		else

			updateMarkerPosition = ->

				minWidth = 768
				maxWidth = 1440

				percent = (Win.width - minWidth) / maxWidth
				percent = THREE.Math.clamp(percent, 0, 1)

				x = Utils.lerp( -24, -30, percent )

				position = [-26, -4, 0]
				objectPositionMarker.position.fromArray(position)

			Win.on('resize', =>

				updateMarkerPosition()
			)

			updateMarkerPosition()

		helper.visible 					   	   = false
		objectPositionMarker.visible 	   	   = false
		objectPositionLookAtMarker.visible 	   = false
		objectPositionTransitionMarker.visible = false

		helper.add( objectPositionMarker )
		helper.add( objectPositionLookAtMarker )
		helper.add( objectPositionTransitionMarker )
		Scene.add( helper )

		folder = GUI.addFolder('ObjectZoomHelper')

		folder.add(objectPositionMarker.position, 'x', -size, size).name('position x')
		folder.add(objectPositionMarker.position, 'y', -size, size).name('position y')
		folder.add(objectPositionMarker.position, 'z', -size, size).name('position z')

		localToWorld = ( object, parent ) ->

			Scene.updateMatrixWorld()
			helper.updateMatrixWorld()

			position = object.position.clone()

			return position.applyMatrix4( parent.matrixWorld )

		getScreenPositionData = ->

			position   = localToWorld( objectPositionMarker, helper )
			lookat     = localToWorld( objectPositionLookAtMarker, helper )
			transition = localToWorld( objectPositionTransitionMarker, helper )
			lookatMarker = localToWorld( objectPositionLookAtMarker, helper )

			return {
				position: position
				lookat: lookat
				transition: transition
				lookatMarker: lookatMarker
			}

		update = ( camera ) ->

			position = camera.position

			cameraLookat.set(0, 0, -1)

			cameraLookat.applyQuaternion( camera.quaternion.clone() )

			distance = 140

			cameraEndPosition.copy(position)

			cameraEndPosition.x += (distance * cameraLookat.x)
			cameraEndPosition.y += (distance * cameraLookat.y)
			cameraEndPosition.z += (distance * cameraLookat.z) 

			helper.position.copy( cameraEndPosition )
			helper.lookAt( position )

			# object lookat vector
			pos = objectPositionMarker.position
			objectPositionLookAtMarker.position.set(pos.x, pos.y, 50)

			objectPositionTransitionMarker.position.set(pos.x, pos.y, -50)

		return {
			getScreenPositionData: getScreenPositionData
			update: update
		}