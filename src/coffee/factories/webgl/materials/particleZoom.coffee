class ParticleZoomMaterial extends Factory

	constructor: ->

		return {} if env.WEBGL is false

		DEFAULT_PHOTO_OPACITY = 0.4

		params =
			map: THREE.ImageUtils.loadTexture Assets.getAsset('Particle').url
			transparent: true
			fog: off
			side: THREE.DoubleSide

		particleMaterial = new THREE.MeshBasicMaterial( params )

		params =
			# map: THREE.ImageUtils.loadTexture Assets.getAsset('ProfilePicture').url
			alphaMap: THREE.ImageUtils.loadTexture Assets.getAsset('ParticleAlphaMap').url
			side: THREE.DoubleSide
			transparent: true
			opacity: DEFAULT_PHOTO_OPACITY

		photoMaterial = new THREE.MeshBasicMaterial( params )

		updatePhotoTexture = ( url, delay = 0.2 ) ->

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

			TweenMax.allTo([particleMaterial, photoMaterial], 0.6, params)


		fadeIn = =>

			particleMaterial.opacity = 0
			photoMaterial.opacity  = DEFAULT_PHOTO_OPACITY

			params =
				opacity: 1

			TweenMax.to(particleMaterial, 0.6, params)

		hideTransition = ( callback ) ->

			params =
				opacity: 0
				onComplete: => callback?()

			TweenMax.allTo([particleMaterial, photoMaterial], 1, params)

		showTransition = ->

			fadeIn()

		resetOpacity = ->

			particleMaterial.opacity = 1
			photoMaterial.opacity = DEFAULT_PHOTO_OPACITY

		resetTexture = ->

			photoMaterial.map = null
			photoMaterial.needsUpdate = true

		return {
			particleMaterial: particleMaterial
			photoMaterial: photoMaterial
			updatePhotoTexture: updatePhotoTexture
			fadeOut: fadeOut
			hideTransition: hideTransition
			showTransition: showTransition
			resetOpacity: resetOpacity
			resetTexture: resetTexture
		}