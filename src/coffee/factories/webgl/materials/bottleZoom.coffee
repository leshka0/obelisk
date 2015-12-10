class BottleZoomMaterial extends Factory

	constructor: ( GUI ) ->

		return {} if env.WEBGL is false

		folder = GUI.addFolder( 'BottleMaterial x' )

		folder.open()

		DEFAULT_PHOTO_OPACITY = 0.4

		config =
			color: '#151615'
			ambient: 0xFFFFFF
			emissive: '#0a180a'
			specular: 0xFFFaac

		params =
			color: config.color
			ambient: config.ambient
			emissive: config.emissive
			specular: config.specular
			shininess: 38
			opacity: 0.92
			transparent: true
			shading: THREE.SmoothShading
			# side: THREE.DoubleSide
			fog: false

		bottleMaterial = new THREE.MeshPhongMaterial( params )

		update = ->

			# material.color.setHex( String(config.color).replace('#', '0x'))
			# material.ambient.setHex( String(config.ambient.replace('#', '0x'))
			# material.emissive.setHex( String(config.emissive).replace('#', '0x'))
			# material.specular.setHex( String(config.specular).replace('#', '0x'))

		# folder.addColor(config, 'color').onChange( update )
		# folder.addColor(material, 'ambient')
		# folder.addColor(config, 'emissive').onChange( update )
		# folder.addColor(config, 'specular').onChange( update )
		# folder.add(material, 'shininess', 0, 100)
		# folder.add(material, 'wireframe')
		folder.add(bottleMaterial, 'opacity', 0, 1)

		params =
			# map: THREE.ImageUtils.loadTexture Assets.getAsset('ProfilePicture').url
			alphaMap: THREE.ImageUtils.loadTexture Assets.getAsset('BottleAlphaMap').url
			# side: THREE.DoubleSide
			transparent: true
			opacity: DEFAULT_PHOTO_OPACITY

		photoMaterial = new THREE.MeshBasicMaterial( params )

		updatePhotoTexture = ( url, delay = 0.2 ) ->

			resetTexture()

			# console.log 'updatePhotoTexture', url

			image = document.createElement('img')
			image.crossOrigin = ''

			TweenLite.killTweensOf photoMaterial

			photoMaterial.opacity = 0

			image.onload = =>

				texture = new THREE.Texture(image)
				texture.needsUpdate = true

				photoMaterial.map = texture
				photoMaterial.needsUpdate = true

				params =
					opacity: DEFAULT_PHOTO_OPACITY
					delay: delay

				TweenMax.to(photoMaterial, 1, params)

			image.src = url

		fadeOut = =>

			params =
				opacity: 0

			TweenMax.allTo([bottleMaterial, photoMaterial], 1, params)

		fadeIn = =>

			bottleMaterial.opacity = 0
			photoMaterial.opacity  = 0

			params =
				opacity: 1

			TweenMax.to(bottleMaterial, 0.6, params)


		hideTransition = ( callback ) ->

			params =
				opacity: 0
				onComplete: => callback?()

			TweenMax.allTo([bottleMaterial, photoMaterial], 1, params)

		showTransition = ->

			fadeIn()

		resetOpacity = ->

			bottleMaterial.opacity = 1

		resetTexture = ->

			photoMaterial.opacity = 0
			photoMaterial.map = null
			photoMaterial.needsUpdate = true

		return {
			bottleMaterial: bottleMaterial
			photoMaterial: photoMaterial
			updatePhotoTexture: updatePhotoTexture
			fadeOut: fadeOut
			fadeIn: fadeIn
			hideTransition: hideTransition
			showTransition: showTransition
			resetOpacity: resetOpacity
			resetTexture: resetTexture
		}