class Lights extends Factory

	constructor: ( GUI ) ->

		lights =
			ambient:
				color: 0x010101
			directional:
				color: 0xDed4cc
				position:
					x: -1000
					y: 500
					z: 1000
			directional2:
				color: 0x6f8c8b
				position:
					x: -10
					y: 10
					z: -10
			point:
				color: 0x6c4c3f
				position:
					x: 0
					y: 0
					z: 0


		ambLight   = new THREE.AmbientLight( lights.ambient.color )
		dirLight   = new THREE.DirectionalLight( lights.directional.color, 1 )
		dirLight2   = new THREE.DirectionalLight( lights.directional2.color, 1)
		pointLight = new THREE.PointLight( lights.point.color, 4, 500 )
		all        = [ambLight, dirLight, dirLight2, pointLight]
		lightsKeys = ['ambient', 'directional', 'directional2', 'point']

		# cast Shadow
		dirLight.castShadow = true;

		dirLight.position.set( lights.directional.position.x, lights.directional.position.y, lights.directional.position.z )
		dirLight2.position.set( lights.directional2.position.x, lights.directional2.position.y, lights.directional2.position.z )
		pointLight.position.set( lights.point.position.x, lights.point.position.y, lights.point.position.z )

		dirLight.position.set( -1000, 500, 1000 )
		dirLight2.position.set( -1000, 1000, -1000 )

		lightFolder = GUI.addFolder( 'lights' )
		# lightFolder.open()

		update = ->

			for light, i in all
				light.color.setHex( String(lights[ lightsKeys[i] ].color).replace('0x', '#') )

		createFolder = ( light, type ) ->

			folder = lightFolder.addFolder(type)

			positionRange = 1000
			rotationRange = Math.PI

			folder.addColor( lights[type], 'color' ).name( type ).onChange( update )
			folder.add(light.position, 'x', -positionRange, positionRange).name('position x')
			folder.add(light.position, 'y', -positionRange, positionRange).name('position y')
			folder.add(light.position, 'z', -positionRange, positionRange).name('position z')
			folder.add(light.rotation, 'x', -rotationRange, rotationRange).name('rotation x')
			folder.add(light.rotation, 'y', -rotationRange, rotationRange).name('rotation y')
			folder.add(light.rotation, 'z', -rotationRange, rotationRange).name('rotation z')

			folder.open()
		
		createFolder( ambLight, 'ambient' )
		createFolder( dirLight, 'directional' )
		createFolder( dirLight2, 'directional2' )
		createFolder( pointLight, 'point' )

		return {
			ambient: ambLight
			directional: dirLight
			directional2: dirLight2
			point: pointLight
			all: all
		}