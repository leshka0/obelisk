class BottleMaterial extends Factory

	constructor: ( GUI ) ->

		return {} if env.WEBGL is false

		folder = GUI.addFolder( 'BottleMaterial' )

		# folder.open()
		
		textureURLs = [  
        Assets.getAsset('BottleTexture').url,  
        Assets.getAsset('BottleTexture').url,   
        Assets.getAsset('BottleTexture').url,   
        Assets.getAsset('BottleTexture').url,  
        Assets.getAsset('BottleTexture').url,   
        Assets.getAsset('BottleTexture').url
  		 ];
		map 	= THREE.ImageUtils.loadTextureCube(textureURLs)

		config =

			color: '#050605'
			ambient: 0xFFFFFF
			emissive: '#000000'
			specular: 0xFFFaac

		params =
			color: config.color
			ambient: config.ambient
			emissive: config.emissive
			specular: config.specular
			shininess: 38
			wireframe: off
			opacity: 0.92
			transparent: true
			shading: THREE.SmoothShading
			side: THREE.DoubleSide
			emissive: 0x0a180a
			envMap: map
			combine: THREE.AddOperation
			reflectivity: 1
			refractionRatio: 0.6

		material = new THREE.MeshPhongMaterial( params )

		update = ->

			material.color.setHex( String(config.color).replace('#', '0x'))
			# material.ambient.setHex( String(config.ambient.replace('#', '0x'))
			material.emissive.setHex( String(config.emissive).replace('#', '0x'))
			material.specular.setHex( String(config.specular).replace('#', '0x'))

		folder.addColor(config, 'color').onChange( update )
		folder.addColor(config, 'emissive').onChange( update )
		folder.addColor(config, 'specular').onChange( update )
		folder.add(material, 'shininess', 0, 100)
		folder.add(material, 'wireframe')
		folder.add(material, 'opacity', 0, 1)

		return {
			material: material
		}