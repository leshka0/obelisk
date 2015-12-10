class HatMaterial extends Factory

	constructor: ( GUI, Detect ) ->

		return {} if env.WEBGL is false

		textureURLs = [  
        Assets.getAsset('BottleTexture').url,  
        Assets.getAsset('BottleTexture').url,   
        Assets.getAsset('BottleTexture').url,   
        Assets.getAsset('BottleTexture').url,  
        Assets.getAsset('BottleTexture').url,   
        Assets.getAsset('BottleTexture').url
  		 ];
		map 	= THREE.ImageUtils.loadTextureCube(textureURLs)
		map2 	= THREE.ImageUtils.loadTexture Assets.getAsset('BaseTexture').url

		config =

			color: '#050605'
			ambient: 0xFFFFFF
			emissive: '#000000'
			specular: 0xcfffac

		params =
			map: map2
			color: config.color
			#ambient: config.ambient
			#emissive: config.emissive
			specular: config.specular
			shininess: 100
			wireframe: off
			opacity: 0.93
			transparent: true
			shading: THREE.SmoothShading
			side: THREE.DoubleSide
			#emissive: 0x0a180a
			envMap: map
			combine: THREE.AddOperation
			reflectivity: 1
			refractionRatio: 0.6
			bumpMap: map2
			bumpScale: 0.5

		material = new THREE.MeshPhongMaterial( params )

		fadeIn = ( delay = 0 ) ->

			material.opacity = 0

			params =
				opacity: 0.93
				delay: delay

			TweenMax.to( material, 5, params )

		hide = ->

			material.opacity = 0

		return {
			material: material
			fadeIn: fadeIn
			hide: hide
		}