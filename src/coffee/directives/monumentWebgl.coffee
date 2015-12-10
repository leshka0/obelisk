class MonumentWebgl extends Directive

	constructor: ( $window, \
				  $rootScope, \
				  $location, \
	              GUI, \
	              TwistModifier, \
	              lodash, \
	              ObjectLayout, \
	              Materials, \
	              Lights, \
	              Fog, \
	              Timeline, \
	              ObjectZoomHelper, \
	              Cameras, \
	              Scene, \
	              IntroPath, \
	              TowerPath, \
	              Win, \
	              Detect, \
	              Settings, \
	              Utils ) ->

		return {
			restrict: 'A'
			scope:{
				enabled: '=enabled'
				userloggedin: '=userloggedin'
			}
			link: ( @$scope, @$element ) ->

				return if env.WEBGL is false

				hasIntersected = false
				currentObjectData = null
				deeplinkFirstTime = on
				initialTween 	  = null

				transitionInComplete = false

				$registerFormDragArea = $('.register-form .left')
				$obeliskuserDragArea  = $('.obelisk-user')

				# drag component
				objectDrag = new ObjectDragIOWebgl( $('.register-form .left, .obelisk-user'), Detect.device, Win )
				dragIO 	   = new DragIOWebgl( @$element, Detect.device )

				# cameras
				Cameras.user.position.set(0, 0, 50)

				# scene, renderer
				renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true, canvas: @$element[0] } )

				# Shadows RenderCameras.positionY
				renderer.shadowMapEnabled = true;
				renderer.shadowMapType = THREE.PCFSoftShadowMap;

				renderer.setSize( $window.innerWidth, $window.innerHeight )

				# fog
				Scene.fog = Fog.fog

				# lights
				Scene.add( light ) for light in Lights.all

				# helpers
				helperGrid   = new THREE.GridHelper( 50, 10 )
				helperAxis   = new THREE.AxisHelper( 1000 )
				# helperCamera = new THREE.CameraHelper( Cameras.user )
				# helperDirectionalLight = new THREE.DirectionalLightHelper( Lights.directional, 10 )
				# helperPointLight = new THREE.PointLightHelper( Lights.point, 10 )

				# Scene.add( helperGrid )
				# Scene.add( helperAxis )
				# Scene.add( helperCamera )
				# Scene.add( helperDirectionalLight )
				# Scene.add( helperPointLight )

				controls = new THREE.OrbitControls( Cameras.dev, @$element[0] )

				helpers = [ #helperCamera
							#helperDirectionalLight
							#helperPointLight
							controls ]

				# Get an asset
				getAsset = ( id ) ->
					lodash.find(Assets.all(), {id: id})


				if Settings.postProcessing

					#Wagner
					WAGNER.fragmentShadersPath = './js/fragment-shaders'
					WAGNER.assetsPath = './js/assets'

					composer = new WAGNER.Composer( renderer, { useRGBA: true } )
					dirtPass = new WAGNER.DirtPass()
					noisePass = new WAGNER.NoisePass()
					noisePass.params.amount = .065
					noisePass.params.speed = 10
					zoomBlurPass = new WAGNER.ZoomBlurPass();
					zoomBlurPass.params.strength = .005;

					composer.setSize( Win.width, Win.height )
					zoomBlurPass.params.center.set( .5 * composer.width, .5 * composer.height )


				# objects
				createDome = ->

					material = Materials.DomeMaterial.material

					geometry = new THREE.SphereGeometry(6000, 60, 40);

					mesh = new THREE.Mesh( geometry, material )

					mesh.receiveShadow = false

					mesh.scale.set(-1, 1, 1);


					return mesh

				createGround = ->

					material = Materials.GroundMaterial.material

					# material.wireframe = on

					geometry = new THREE.PlaneBufferGeometry( 1000, 1000 )

					mesh = new THREE.Mesh( geometry, material )

					mesh.receiveShadow = true

					mesh.rotation.x = -Math.PI / 2

					if env.PHASE is '1'
						mesh.position.set( 0, 230, 0 )
					else

						scale = 3.5

						mesh.scale.set(scale, scale, scale)

					return mesh

				createBase = ->

					material = Materials.BaseMaterial.material

					geometry = getAsset('Base').data

					mesh = new THREE.Mesh( geometry, material )

					mesh.receiveShadow = true

					mesh.castShadow = true

					return mesh

				createTower = ->

					params =
						color: 0xFFFFFF
						wireframe: on

					geometry = getAsset('Tower').data

					material = new THREE.MeshLambertMaterial( params )

					mesh = new THREE.Mesh( geometry, material )

					mesh.visible = off

					return mesh

				createHat = ->

					material = Materials.HatMaterial.material

					geometry = getAsset('Hat').data

					mesh = new THREE.Mesh( geometry, material )

					return mesh

				createBottles = ->

					material = Materials.BottleMaterial.material

					meshes = []

					scale = 0.42

					geometry = getAsset('Bottle').data
					geometry.mergeVertices()
					geometry.computeVertexNormals()
					# geometry.computeTangents()

					for i in [0...ObjectLayout.getTotalBottles()]

						mesh = new THREE.Mesh( geometry, material )

						object3d = new THREE.Object3D

						mesh.scale.set(scale, scale, scale)

						mesh.castShadow = true

						mesh.name = "#{i}"

						mesh._d = mesh.position.clone()
						mesh.phaseY = Math.random() * 10
						mesh.phaseZ = Math.random() * 10

						object3d.add(mesh)

						meshes.push( object3d )

					return meshes

				createParticles = ->

					ParticleMaterial = Materials.ParticleMaterial
					geometry = new THREE.Geometry()


					for i in [0...ObjectLayout.getTotalParticles()]

						geometry.vertices.push( new THREE.Vector3() )

					mesh = new THREE.PointCloud( geometry, ParticleMaterial.material )

					mesh.sortParticles = true

					return mesh

				createZoomBottle = ->

					geometry = getAsset('BottleHighPoly').data
					geometry.mergeVertices()
					geometry.computeVertexNormals()

					scale = 0.42

					container = new THREE.Object3D()
					rotationContainer = new THREE.Object3D()

					mesh = new THREE.Mesh( geometry,  Materials.BottleZoomMaterial.bottleMaterial )

					mesh.scale.set(scale, scale, scale)

					mesh.castShadow = true

					# Plane inside bottle for profile picture
					geometry = new THREE.PlaneBufferGeometry( 38, 38, 1, 1 )
					planeMesh = new THREE.Mesh( geometry, Materials.BottleZoomMaterial.photoMaterial )

					planeMesh.position.set(0, -1.5, 6.4)

					positionRange = Math.PI

					GUI.add(rotationContainer.rotation, 'x', -positionRange, positionRange).name('rotation x')
					GUI.add(rotationContainer.rotation, 'y', -positionRange, positionRange).name('rotation y')
					GUI.add(rotationContainer.rotation, 'z', -positionRange, positionRange).name('rotation z')

					rotationContainer.add(planeMesh)
					rotationContainer.add(mesh)
					container.add(rotationContainer)

					container.visible = false

					return container

				createZoomParticle = ->

					size = 50

					container = new THREE.Object3D()
					rotationContainer = new THREE.Object3D()

					ParticleZoomMaterial = Materials.ParticleZoomMaterial
					geometry = new THREE.PlaneBufferGeometry(size, size)

					mesh = new THREE.Mesh( geometry, ParticleZoomMaterial.particleMaterial )

					# Plane inside bottle for profile picture
					geometry = new THREE.PlaneBufferGeometry( 31, 31, 1, 1 )
					planeMesh = new THREE.Mesh( geometry, ParticleZoomMaterial.photoMaterial )

					planeMesh.position.set(0, 0, 0.1)

					positionRange = 50

					GUI.add(planeMesh.position, 'x', -positionRange, positionRange).name('position x')
					GUI.add(planeMesh.position, 'y', -positionRange, positionRange).name('position y')
					GUI.add(planeMesh.position, 'z', -positionRange, positionRange).name('position z')

					rotationContainer.add(planeMesh)
					rotationContainer.add(mesh)
					container.add(rotationContainer)

					container.visible = false

					return container

				point = ( v ) ->

					geometry = new THREE.SphereGeometry( 5, 8, 8 )
					m = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:0xFF0000, wireframe: true }))

					m.position.copy v

					Scene.add m

				createObjectRotationHelpher = ->

					mesh = new THREE.Mesh( new THREE.SphereGeometry( 50, 4, 4), new THREE.MeshBasicMaterial( 0x00FF00))

					mesh.visible = false

					return mesh


				# Raycaster
				raycaster = new THREE.Raycaster()
				raycaster.params.PointCloud.threshold = 6
				raycasterMouse = new THREE.Vector2()

				###
				Create meshes
				###

				domeMesh	   = createDome()
				groundMesh	   = createGround()
				towerMesh 	   = createTower()
				bottles   	   = createBottles()
				bottleZoomMesh = createZoomBottle()
				particleMesh   = createParticles()
				particleZoomMesh   = createZoomParticle()
				objectRotationHelper = createObjectRotationHelpher()

				Scene.add( domeMesh )
				Scene.add( groundMesh )
				Scene.add( towerMesh )
				Scene.add( particleMesh )
				Scene.add( particleZoomMesh )
				Scene.add( bottleZoomMesh )
				Scene.add( objectRotationHelper )

				bottlesMeshes = []

				for object in bottles
					bottlesMeshes.push(object.children[0])

				intersectableMeshes = [particleMesh].concat(bottlesMeshes)

				if env.PHASE isnt '1'
					baseMesh = createBase()
					hatMesh  = createHat()
					Scene.add( baseMesh )
					Scene.add( hatMesh )

				for bottle in bottles
					Scene.add( bottle )


				# twist setup
				indices = getAsset('MeshIndices').data.indices

				# Curve Indices
				curveIndices = []
				for set in indices
					curveIndices.push set[0]


				# Combine all indices into a single array
				tmp = []
				for set in indices
					tmp = tmp.concat set

				indices = tmp

				# Save default vertex position
				for vertex, i in towerMesh.geometry.vertices
					towerMesh.geometry.vertices[i]._d 		 = new THREE.Vector3(vertex.x, vertex.y, vertex.z)
					# towerMesh.geometry.vertices[i]._d.y += Math.sin(Math.random() * 10) * 30
					# towerMesh.geometry.vertices[i]._position = new THREE.Vector3(vertex.x, vertex.y, vertex.z)


				# data for object order
				objectOrder = ObjectLayout.getOrder()

				modifier = {}

				# Calculate the camera tower path
				pathTowerPoints = getAsset('PathTower').data

				# cache these a
				startObj 			  = pathTowerPoints.camera[0]
				endObj   			  = pathTowerPoints.camera[pathTowerPoints.camera.length-1]
				rotationAxis    	  = new THREE.Vector3( 0, 1, 0 )
				cameraPathStart 	  = new THREE.Vector3( startObj.x, startObj.y, startObj.z )
				cameraPathEnd   	  = new THREE.Vector3( endObj.x, endObj.y, endObj.z )
				cameraPathTotalPoints = 25

				if env.PHASE1
					cameraPathBaseSize = 400
				else
					cameraPathBaseSize = 600

				getTowerPathPoints = ->

					points = []

					for index in [0...cameraPathTotalPoints]

						alpha = (index / cameraPathTotalPoints)

						vertex = cameraPathStart.clone().lerp(cameraPathEnd, alpha )

						vertex.z = cameraPathBaseSize + ( alpha * (1600 * (1 - modifier.progress)))

						vertex.applyAxisAngle( rotationAxis, Cameras.rotationAngle )

						point =
							x: vertex.x
							y: vertex.y
							z: vertex.z

						points.push( point )

					return points


				# paths
				IntroPath.setup( getAsset('PathIntro').data )
				TowerPath.setup( getAsset('PathTower').data, getTowerPathPoints() )

				reset = ->

					modifier =
						angle: 0.1
						taper: 0.1
						taperScale	: 0.1
						progress: 0.1

				reset()

				twist = =>

					TwistModifier.angle(modifier.angle)

					numVertices = towerMesh.geometry.vertices.length

					indicesLength = indices.length

					indicesStart = Math.floor(THREE.Math.mapLinear(modifier.progress, 0, 1, 0, indicesLength))

					for index, i in indices

						gradient = (i - indicesStart) / indicesLength
						gradient = THREE.Math.clamp(gradient, 0, 1)

						vertex = towerMesh.geometry.vertices[index]

						vertex.set(vertex._d.x, vertex._d.y, vertex._d.z)

						position = TwistModifier.twistAndTaper( vertex, i, modifier.taper, modifier.taperScale, gradient )

						# vertex._position.set( position.x, position.y, position.z )

					towerMesh.geometry.verticesNeedUpdate = on

					# update bottle and particle positions

					quadIndex     = 0
					bottleIndex   = 0
					particleIndex = 0

					lookat = new THREE.Vector3()
					cb 	   = new THREE.Vector3()
					ab 	   = new THREE.Vector3()

					for face, i in towerMesh.geometry.faces

						# every quad

						# one side uses the wrong set or triangles

						if i < 600 or i >= 1200
							logic = i % 2 is 0
						else
							logic = i % 2 isnt 0

						if logic

							vA = towerMesh.geometry.vertices[face.a]
							vB = towerMesh.geometry.vertices[face.b]
							vC = towerMesh.geometry.vertices[face.c]

							centerX = (vA.x + vB.x + vC.x) / 3
							centerY = (vA.y + vB.y + vC.y) / 3
							centerZ = (vA.z + vB.z + vC.z) / 3

							# face normal from https://github.com/mrdoob/three.js/blob/master/src/core/Geometry.js

							cb.subVectors( vC, vB )
							ab.subVectors( vA, vB )

							cb.cross( ab )
							cb.normalize()

							lookat.x = centerX + (50 * cb.x)
							lookat.y = centerY + (50 * cb.y)
							lookat.z = centerZ + (50 * cb.z)

							# point(lookat)

							type = objectOrder[quadIndex]

							if type == 'bottle'

								bottle = bottles[bottleIndex]
								bottle.position.set( centerX, centerY, centerZ )
								bottle.lookAt( lookat )

								bottleIndex++

							else

								particleMesh.geometry.vertices[particleIndex].set( centerX, centerY, centerZ )

								particleIndex++

							quadIndex++

						particleMesh.geometry.verticesNeedUpdate = true


					###
					Update camera curve points
					###
					points = getTowerPathPoints()

					TowerPath.updatePoints(points)


				# Initial transition in
				@animateIn = ( duration = 5, isDeeplink = false ) ->

					# Update the last point on the intro path animation
					# to the first tower path point

					initialTween.totalProgress(1).kill()

					deeplinkFirstTime = false

					$rootScope.$emit('on.transition.in')

					points = getAsset('PathIntro').data.camera

					points.pop()

					points.push(TowerPath.getPointOnCameraPath(0))

					IntroPath.updatePoints(points)

					Cameras.positionY = 0

					params =
						positionY: 1
						onUpdate: =>
							IntroPath.updateCameraPosition(Cameras.positionY)
							moveLight(1 - Cameras.positionY)
						onComplete: =>
							transitionInComplete = true

							if isDeeplink
								exploreDeeplink()

					TweenMax.to(Cameras, duration, params)

				@animateInToUserObject = ( register = true ) ->

					$rootScope.$emit('on.transition.in')

					# calculate point on tower where the object is

					transitionInComplete = false

					user = userService.get()

					objectIndex = parseInt(user.occurance)

					switch user.assetType

						when 'bottle'

							position = bottles[objectIndex].position

						when 'particle'

							position = particleMesh.geometry.vertices[objectIndex]

					rotationY = position.y
					rotationY = rotationY.map(cameraPathStart.y, cameraPathEnd.y, 0, 1)
					rotationY = THREE.Math.clamp(rotationY, 0, 1)

					if deeplinkFirstTime
						Cameras.positionY = 0
						TowerPath.updateCameraPosition(0)

					params =
						positionY: rotationY
						delay: 1
						onUpdate: =>

							Cameras.rotationAngle  = dragIO.rotation.x

							points = getTowerPathPoints()
							TowerPath.updatePoints(points)
							TowerPath.updateCameraPosition(Cameras.positionY)

							moveLight(Cameras.positionY)

						onComplete: =>

							dragIO.rotation.y = Cameras.positionY

							transitionInComplete = true

							exploreDeeplink(register)

					duration = 0.5 + (5 * rotationY)

					TweenMax.to(Cameras, duration, params)

					deeplinkFirstTime = off


				shapeFolder = GUI.addFolder( 'shape' )
				# shapeFolder.open()

				angleRange = 10

				shapeFolder.add(modifier, 'angle', -angleRange, angleRange).onChange( twist )
				shapeFolder.add(modifier, 'taper', 0, 0.2).onChange( twist )
				shapeFolder.add(modifier, 'taperScale', 0, 2).onChange( twist )
				shapeFolder.add(modifier, 'progress', 0, 1).onChange( twist )
				shapeFolder.add(@, 'animateIn')

				zoom = ( camera, zoom ) ->

					camera.position.set( 1 * zoom, 0.75 * zoom, 1 * zoom )
					camera.lookAt( new THREE.Vector3 )

				fovZoom = ( zoomIn = false ) ->

					# TweenMax.killTweensOf( Cameras.user )

					fov = if zoomIn then 60 else 65

					params =
						fov: fov
						ease: Quad.easeOut
						onUpdate: => Cameras.user.updateProjectionMatrix()

					TweenMax.to( Cameras.user, 0.8, params )

				animateObjectIn = ( data, register = true ) ->

					# console.log 'animateObjectIn -->', data

					if transitionInComplete
						Fog.fadeIn()

					fovZoom( true )

					if register
						objectDrag.setActiveElement( $registerFormDragArea, register )
					else
						objectDrag.setActiveElement( $obeliskuserDragArea, register )

					objectDrag.enable()

					ObjectZoomHelper.update(Cameras.user)

					screenPositionData = ObjectZoomHelper.getScreenPositionData()

					screenPosition 		 	 = screenPositionData.position
					screenPositionLookat 	 = screenPositionData.lookat
					screenPositionTransition = screenPositionData.transition

					if data.objectType == 'particle'

						# hide particle
						Materials.ParticleMaterial.hideParticle(data.intersectionIndex)

						scale = 0.27

						# scale down the particle to match the pointcloud particles size

						objectRotationHelper.position.copy(screenPosition)
						objectRotationHelper.lookAt(screenPositionLookat)

						# reset opacity
						particleZoomMesh.visible = true
						bottleZoomMesh.visible = false
						Materials.ParticleZoomMaterial.resetOpacity()

						particleZoomMesh.lookAt(objectRotationHelper)

						if data.animateFromPosition

							particleZoomMesh.scale.set(scale, scale, scale)
							particleZoomMesh.position.copy(data.intersectionPoint)
							particleZoomMesh.lookAt( Cameras.user.position )

							params =
								x: screenPosition.x
								y: screenPosition.y
								z: screenPosition.z
								onUpdate: =>
									particleZoomMesh.lookAt(screenPositionLookat)

							TweenMax.to(particleZoomMesh.position, 1, params)

							# scale transition
							params =
								x: 1
								y: 1
								z: 1

							TweenMax.to(particleZoomMesh.scale, 1, params)

						else

							particleZoomMesh.position.copy(screenPosition)
							particleZoomMesh.lookAt(screenPositionLookat)
							particleZoomMesh.scale.set(1, 1, 1)

							particleZoomMesh.position.copy(screenPositionTransition)

							params =
								x: screenPosition.x
								y: screenPosition.y
								z: screenPosition.z

							TweenMax.to(particleZoomMesh.position, 1, params)


						# set the bottle to the end position
						bottleZoomMesh.position.copy(screenPosition)
						bottleZoomMesh.lookAt(screenPositionLookat)

					else

						# console.log 'animate bottle'

						# hide bottle
						data.object.visible = false

						bottleZoomMesh.position.copy(data.object.parent.position)
						bottleZoomMesh.rotation.copy(data.object.parent.rotation)

						objectRotationHelper.position.copy(screenPosition)
						objectRotationHelper.lookAt(screenPositionLookat)

						# reset opacity
						particleZoomMesh.visible = false
						bottleZoomMesh.visible = true
						Materials.BottleZoomMaterial.fadeIn()

						if data.animateFromPosition

							if bottleZoomMesh.rotation.y < Math.PI
								bottleZoomMesh.rotation.y += Math.PI

							params =
								x: screenPosition.x
								y: screenPosition.y
								z: screenPosition.z
								onUpdate: =>
									bottleZoomMesh.lookAt(screenPositionLookat)

							TweenMax.to(bottleZoomMesh.position, 1, params)

							params =
								y: objectRotationHelper.rotation.y

							TweenMax.to(bottleZoomMesh.rotation, 1, params)

						else

							bottleZoomMesh.position.copy(screenPositionTransition)
							bottleZoomMesh.lookAt(screenPositionLookat)

							params =
								x: screenPosition.x
								y: screenPosition.y
								z: screenPosition.z

							TweenMax.to(bottleZoomMesh.position, 1, params)


						# set the bottle to the end position
						particleZoomMesh.position.copy(screenPosition)
						particleZoomMesh.lookAt(screenPositionLookat)

					dragIO.disable()

				animateObjectOut = ->

					return unless currentObjectData?

					fovZoom( false )

					objectDrag.disable()

					# reset the visibility of the original particle / bottle

					screenPositionData = ObjectZoomHelper.getScreenPositionData()

					screenPosition 		 	 = screenPositionData.position
					screenPositionLookat 	 = screenPositionData.lookat
					screenPositionTransition = screenPositionData.transition

					if currentObjectData.objectType == 'particle'

						# show particle
						# Materials.ParticleMaterial.showParticle(currentObjectData.intersectionIndex)

						params =
							x: screenPositionTransition.x
							y: screenPositionTransition.y
							z: screenPositionTransition.z

						TweenMax.to(particleZoomMesh.position, 1, params)

					else

						params =
							x: screenPositionTransition.x
							y: screenPositionTransition.y
							z: screenPositionTransition.z

						TweenMax.to(bottleZoomMesh.position, 1, params)

						# show bottle
						currentObjectData.object.visible = true


					# rotation container
					container = bottleZoomMesh.children[0]
					TweenMax.killTweensOf( container )
					TweenMax.to(container.rotation, 0.6, {x: 0, y: 0, z: 0})

					# rotation container
					container = particleZoomMesh.children[0]
					TweenMax.killTweensOf( container )
					TweenMax.to(container.rotation, 0.6, {x: 0, y: 0, z: 0})

					Materials.ParticleZoomMaterial.fadeOut()
					Materials.BottleZoomMaterial.fadeOut()

					if angular.equals( Utils.getUriSegment(1), 'explore' )
						dragIO.enable()


				# index is the particle index in the mesh
				isFoundUserShown = false
				showfoundUser = ( _currentObjectData ) ->

					currentObjectData = _currentObjectData

					isFoundUserShown = true

					screenPosition = Utils.toScreenPosition(currentObjectData.intersectionPoint.clone(), Cameras.user)

					data =
						user: currentObjectData.index
						position: screenPosition
						objectType: currentObjectData.objectType
						occurance: currentObjectData.occurance

					@$scope.$emit('monument.showTooltip', data)

				# when the user has clicked 'claim spot'
				registrationFormOpenTransition = ->

					###
					If a user hasn't chosen a particle or bottle to claim
					pick a random one
					###
					unless currentObjectData?

						# console.log 'getting a random one because the user didnt choose'

						index 	  = obeliskUsersService.getRandomDataForRegistration().occurance
						assetType = obeliskUsersService.getRandomDataForRegistration().assetType

						# console.log 'index', index

						switch assetType

							when 'particle'

								currentObjectData =
									point: particleMesh.geometry.vertices[index]
									objectType: assetType
									objectIndex: index
									animateFromPosition: false

							when 'bottle'

								currentObjectData =
									object: bottles[index].children[0]
									objectType: assetType
									objectIndex: index
									animateFromPosition: false

					animateObjectIn(currentObjectData)

				registrationNextTransition = ->

					animateObjectOut()

				registrationPrevTransition = ->

					animateObjectIn(currentObjectData)

				updateZoomTextures = ( image, delay = 0.5 ) ->

					Materials.BottleZoomMaterial.updatePhotoTexture(image, delay)
					Materials.ParticleZoomMaterial.updatePhotoTexture(image, delay)

				hidefoundUser = ->

					isFoundUserShown = false

					@$scope.$emit('monument.hideTooltip')

				intersectObjects = =>

					return unless dragIO.enabled

					raycasterMouse.x = dragIO.normalX
					raycasterMouse.y = dragIO.normalY

					raycaster.setFromCamera( raycasterMouse, Cameras.user )

					intersections = raycaster.intersectObjects(intersectableMeshes)
					intersection = if intersections.length > 0 then intersections[0] else null

					if intersection?

						order = ObjectLayout.getOrder()

						if intersection.face?

							objectType = 'bottle'

							bottleIndex = parseInt(intersection.object.name)

							# now get the bottle index within the object layout

							index = 0
							occurance = 0
							for object, i in order

								if object is objectType
									if bottleIndex is occurance
										break
									occurance++

								index++

							objectIndex = index

						else

							objectType = 'particle'

							particleIndex = intersection.index

							index = 0
							occurance = 0
							for object, i in order

								if object is objectType
									if particleIndex is occurance
										break
									occurance++

								index++

							objectIndex = index


					if intersection

						hasIntersected = true

						data =
							point: towerMesh.geometry.vertices[objectIndex].clone()
							index: objectIndex
							objectType: objectType
							object: intersection.object
							animateFromPosition: true
							intersectionPoint: intersection.point.clone()
							intersectionIndex: intersection.index
							occurance: occurance

						showfoundUser(data)
					else

						hasIntersected = false

						hidefoundUser()

				onMouseDown = =>

					$rootScope.$emit('mouse.down')

				onMouseUp = =>

					$rootScope.$emit('mouse.up')

				onObjectDrag = ( position ) =>

					posX = position.x
					posY = position.y

					# particle
					containerParticle = particleZoomMesh.children[0].children[1]
					rotate = Math.PI / 8

					TweenMax.killTweensOf( containerParticle )

					rotationZ = posX.map(0, 1, -rotate, rotate)

					params =
						z: rotationZ

					TweenMax.to(containerParticle.rotation, 0.9, params)

					posX = position.x
					posY = position.y

					# bottle
					containerBottle = bottleZoomMesh.children[0]
					rotateX = Math.PI / 8
					rotateY = Math.PI / 6

					TweenMax.killTweensOf( containerBottle )

					rotationX = posY.map(0, 1, -rotateX, rotateX)
					rotationY = posX.map(0, 1, -rotateY, rotateY)

					params =
						x: rotationX
						y: rotationY

					TweenMax.to(containerBottle.rotation, 0.6, params)

				onObjectRelease = ->

					# particle
					containerParticle = particleZoomMesh.children[0].children[1]

					TweenMax.killTweensOf( containerParticle )

					params =
						z: 0

					TweenMax.to(containerParticle.rotation, 0.6, params)

					# bottle
					containerBottle = bottleZoomMesh.children[0]

					TweenMax.killTweensOf( containerBottle )

					params =
						x: 0
						y: 0

					TweenMax.to(containerBottle.rotation, 0.6, params)

				exploreDeeplink = ( register ) ->

					# console.log 'exploreDeeplink'

					userData = userService.get()

					# console.log 'userData', userData

					if userData

						switch userData.assetType

							when 'bottle'

								index = parseInt(userData.occurance)

								currentObjectData =
									object: bottles[index].children[0]
									objectType: 'bottle'
									objectIndex: index
									animateFromPosition: true

							when 'particle'

								index = parseInt(userData.occurance)

								currentObjectData =
									point: particleMesh.geometry.vertices[index]
									objectType: 'particle'
									objectIndex: index
									animateFromPosition: true
									intersectionPoint: particleMesh.geometry.vertices[index]

						updateZoomTextures(userService.get().profilePicture)
						animateObjectIn(currentObjectData, register)

				LIGHT_START_Y = 250
				LIGHT_END_Y   = 1000

				moveLight = ( percent ) ->

					Lights.point.position.y = Utils.lerp(LIGHT_START_Y, LIGHT_END_Y, percent)


				totalBottles = bottles.length

				tmpVector = new THREE.Vector3()

				delta = 0

				# Update
				update = ->

					delta += 0.01

					if transitionInComplete

						# if dragIO.enabled
						dragIO.update()

						Cameras.rotationAngle  = dragIO.rotation.x
						Cameras.positionY = dragIO.rotation.y

						points = getTowerPathPoints()
						TowerPath.updatePoints(points)
						TowerPath.updateCameraPosition(Cameras.positionY)

						moveLight(Cameras.positionY)

					# Fog.update()

					for i in [0...totalBottles]

						# break if i > 0

						child = bottles[i].children[0]

						d = child._d
						phaseY = child.phaseY
						phaseZ = child.phaseZ

						tmpVector.set(d.x, d.y, d.z)

						tmpVector.y += Math.sin(delta + phaseY) * 5
						# tmpVector.z += Math.cos(delta + phaseZ) * 5

						bottles[i].children[0].position.set(tmpVector.x, tmpVector.y, tmpVector.z)

					# for index, i in indices

					# 	break if i > 0

					# 	vertex = towerMesh.geometry.vertices[index]

					# 	p = vertex._position

					# 	tmpVector.set(p.x, p.y, p.z)

					# 	tmpVector.y += Math.sin(delta) * 5

					# 	# towerMesh.geometry.vertices[index].set( tmpVector.x, tmpVector.y, tmpVector.z )

					# 	vertex.set( tmpVector.x, tmpVector.y, tmpVector.z )

					# towerMesh.geometry.verticesNeedUpdate = on

					#
					ObjectZoomHelper.update( Cameras.user )

					# helpers
					helper.update() for helper in helpers


				renderScene = ( camera, left, bottom, width, height ) ->

					width  = $window.innerWidth
					height = $window.innerHeight

					left   *= width
					bottom *= height
					width  *= width
					height *= height

					renderer.setScissor( left, bottom, width, height )
					# renderer.setClearColor( 0x000000, 1 )

					renderer.render( Scene, camera )

					if Settings.postProcessing

						#Wagner render
						composer.reset();
						composer.render( Scene, camera )
						composer.pass( dirtPass );
						composer.pass( noisePass );
						#composer.pass( zoomBlurPass );
						composer.toScreen();

				resize = ->

					# camera & renderer
					ratio  = Win.width / Win.height

					Cameras.dev.aspect  = ratio
					Cameras.user.aspect = ratio

					Cameras.dev.updateProjectionMatrix()
					Cameras.user.updateProjectionMatrix()

					if Settings.postProcessing
						composer.setSize( Win.width, Win.height )
						zoomBlurPass.params.center.set( .5 * composer.width, .5 * composer.height )

					renderer.setSize( Win.width, Win.height )

				# Render
				render = =>

					requestAnimationFrame( render )

					update()

					renderer.enableScissorTest( false )
					renderer.clear()
					renderer.enableScissorTest( true )

					if Cameras.debug
						renderScene( Cameras.user, 0, 0, 0.25, 0.25 )
						renderScene( Cameras.dev, 0, 0, 1, 1 )
					else
						renderScene( Cameras.dev, 0, 0, 0.25, 0.25 )
						renderScene( Cameras.user, 0, 0, 1, 1 )




				###
				Events
				###

				initialSetup = ->

					tween =
						percent: 0

					duration = Utils.lerp(4, 15, Timeline.percent)

					if env.PHASE isnt '1'
						Materials.HatMaterial.hide()

					Materials.HatMaterial.fadeIn(8)

					params =
						percent: Timeline.percent
						ease: Quad.easeInOut
						onUpdate: =>

							# update tower structure
							modifier.angle = Utils.lerp(10, 0, tween.percent)
							modifier.taper = Utils.lerp(0.1, 0, tween.percent)
							modifier.taperScale = Utils.lerp(0.11, 0, tween.percent)
							modifier.progress = tween.percent

							twist()

							# setup camera etc
							IntroPath.updateCameraPosition(0)

						onComplete: =>

							# update tower structure
							# modifier.angle = Utils.lerp(10, 0, tween.percent)
							# modifier.taper = Utils.lerp(0.1, 0, tween.percent)
							# modifier.taperScale = Utils.lerp(0.11, 0, tween.percent)
							# modifier.progress = tween.percent

							# twist()

							# setup camera etc
							# IntroPath.updateCameraPosition(0)


					initialTween = TweenLite.to( tween, duration, params )


				###
				Register
				###

				$rootScope.$on('register.upload.photo', ( x, data ) =>

					# console.log 'image -->', data.image

					updateZoomTextures(data.image)

				)

				$rootScope.$on('register.back.clicked', =>

					# console.log 'register back was clicked'

					animateObjectOut()
					Fog.fadeOut()
				)


				$rootScope.$on('register.complete', =>

					registrationNextTransition()
				)

				$rootScope.$on('mobile.register.prev.state', =>

					# console.log 'fade object in'

					registrationPrevTransition()
				)

				$rootScope.$on('mobile.register.next.state', =>

					# console.log 'fade object out'

					registrationNextTransition()
				)

				###
				User popup
				###

				$rootScope.$on( 'show.user.popup', ( event, data ) =>

					console.debug 'show.user.popup -->', data

					Materials.BottleZoomMaterial.resetTexture()
					Materials.ParticleZoomMaterial.resetTexture()

					animateObjectIn(currentObjectData, false)
					updateZoomTextures(data.profilePicture)

				)

				$rootScope.$on('userpopup.back.clicked', =>

					# console.log 'register back was clicked'

					animateObjectOut()
					Fog.fadeOut()
				)

				objectCycleOutTransition = ( object ) ->

					screenPosition = ObjectZoomHelper.getScreenPositionData().lookatMarker

					params =
						x: screenPosition.x
						y: screenPosition.y
						z: screenPosition.z

					TweenMax.to(object.position, 1, params)

				objectCycleInTransition = ( object ) ->

					screenPositionData = ObjectZoomHelper.getScreenPositionData()

					object.position.copy( screenPositionData.transition )

					params =
						x: screenPositionData.position.x
						y: screenPositionData.position.y
						z: screenPositionData.position.z

					TweenMax.to(object.position, 1, params)


				$rootScope.$on('popup.cycle.user', ( event, data ) =>

					switch data.assetType

						when 'bottle'

							if bottleZoomMesh.visible

								objectCycleOutTransition( bottleZoomMesh )

								Materials.BottleZoomMaterial.hideTransition =>

									objectCycleInTransition( bottleZoomMesh )

									bottleZoomMesh.visible = true

									Materials.BottleZoomMaterial.showTransition()

							else

								objectCycleOutTransition( particleZoomMesh )

								Materials.ParticleZoomMaterial.hideTransition =>

									particleZoomMesh.visible = false

									objectCycleInTransition( bottleZoomMesh )

									bottleZoomMesh.visible = true

									Materials.BottleZoomMaterial.showTransition()

						when 'particle'

							if particleZoomMesh.visible

								objectCycleOutTransition( particleZoomMesh )

								Materials.ParticleZoomMaterial.hideTransition =>

									objectCycleInTransition( particleZoomMesh )

									particleZoomMesh.visible = true

									Materials.ParticleZoomMaterial.showTransition()

							else

								objectCycleOutTransition( bottleZoomMesh )

								Materials.BottleZoomMaterial.hideTransition =>

									bottleZoomMesh.visible = false

									objectCycleInTransition( particleZoomMesh )

									particleZoomMesh.visible = true

									Materials.ParticleZoomMaterial.showTransition()

					updateZoomTextures(data.profilePicture, 1.1)

				)

				$rootScope.$on( '$locationChangeStart', (locationPath) =>

					id = Utils.getPath().split('/')[1]

					if angular.equals( id, 'join' )

						if transitionInComplete
							# console.log 'fade in join'
							Fog.fadeIn()

					if angular.equals( id, '' )
						Fog.fadeOut()
						animateObjectOut()

					if angular.equals( id, 'register' )

						initialTween.totalProgress(1).kill()

						Fog.fadeIn()

						if @$scope.userloggedin is false

							Materials.BottleZoomMaterial.resetTexture()
							Materials.ParticleZoomMaterial.resetTexture()

							registrationFormOpenTransition()

					if angular.equals( id, 'explore' )
						Fog.fadeOut()

				)

				$scope.$watch('enabled', ( newValue, oldValue ) =>

					# console.log 'enable', newValue

					if newValue
						dragIO.enable()
					else
						dragIO.disable()

					return unless newValue

					if _.isNumber(Utils.getDeeplinkUserIndex()) and userService.get()?

						initialTween.totalProgress(1).kill()

						# duration = 5
						@animateInToUserObject(false)

					else if angular.equals( Utils.getUriSegment(1), 'explore' )

						unless transitionInComplete
							@animateIn()

				)

				zoom( Cameras.dev, 600 )
				initialSetup()

				Win.on('resize', resize)
				# Cameras.on('rotate', twist)

				objectDrag.on('drag', onObjectDrag)
				objectDrag.on('release', onObjectRelease)
				dragIO.on('mousedown', onMouseDown)
				dragIO.on('mouseup', onMouseUp)

				setTimeout =>
					render()
					$rootScope.$emit('monument.ready')
					animateIn()
				, 10


		}
