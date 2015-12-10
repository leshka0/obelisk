window.Assets = new class Assets

	constructor: ->

		mainAssets = [
			{
				id: 'Dictionary'
				url: '/xml/'+env.LOCALE+'/Dictionary.xml'
				type: 'xml'
			}
		]

		webglAssets = ->

			assets = [
				{
					id: 'MeshIndices'
					url: '/webgl-assets/data/MeshIndices.json'
					type: 'json'
				}
				{
					id: 'PathIntro'
					url: '/webgl-assets/data/PathIntro.json'
					type: 'json'
				}
				{
					id: 'PathTower'
					url: '/webgl-assets/data/PathTower.json'
					type: 'json'
				}
				{
					id: 'Tower'
					url: '/webgl-assets/models/Tower2.js'
					type: 'geometry'
				}
				{
					id: 'Bottle'
					url: '/webgl-assets/models/Bottle.js'
					type: 'geometry'
				}
				{
					id: 'BottleHighPoly'
					url: '/webgl-assets/models/BottleHighPoly.js'
					type: 'geometry'
				}
				{
					id: 'Particle'
					url: '/webgl-assets/textures/Particle.png'
					type: 'image'
				}
				{
					id: 'FloorTexture'
					url: '/webgl-assets/textures/FloorTexture.jpg'
					type: 'image'
				}
				{
					id: 'SkyTexture'
					url: '/webgl-assets/textures/SkyTexture.jpg'
					type: 'image'
				}
				{
					id: 'FloorTextureBump'
					url: '/webgl-assets/textures/FloorTextureBump.jpg'
					type: 'image'
				}
				{
					id: 'BottleTexture'
					url: '/webgl-assets/textures/BottleTexture.jpg'
					type: 'image'
				}
				{
					id: 'ProfilePicture'
					url: '/webgl-assets/textures/ProfilePicture.jpg'
					type: 'image'
				}
				{
					id: 'BottleAlphaMap'
					url: '/webgl-assets/textures/BottleAlphaMap.jpg'
					type: 'image'
				}
				{
					id: 'ParticleAlphaMap'
					url: '/webgl-assets/textures/ParticleAlphaMap.jpg'
					type: 'image'
				}
			]

			phase2 = [
				{
					id: 'Base'
					url: '/webgl-assets/models/Base.js'
					type: 'geometry'
				}
				{
					id: 'Hat'
					url: '/webgl-assets/models/Hat.js'
					type: 'geometry'
				}
				{
					id: 'BaseTexture'
					url: '/webgl-assets/textures/BaseTexture.jpg'
					type: 'image'
				}
				{
					id: 'BaseTextureBump'
					url: '/webgl-assets/textures/BaseTextureBump.jpg'
					type: 'image'
				}
				{
					id: 'HatTexture'
					url: '/webgl-assets/textures/HatTexture.jpg'
					type: 'image'
				}
			]

			# if env.PHASE is '2'
			assets = assets.concat(phase2)

			return assets

		addAssets = ( _assets ) ->
			mainAssets = mainAssets.concat(_assets)


		fallbackAssets = ->

			assets = [
				{
					id: 'Bottle'
					url: '/fallback-assets/textures/BottleMaterial.png'
					type: 'image'
				}
				{
					id: 'Particle'
					url: '/fallback-assets/textures/ParticleMaterial.png'
					type: 'image'
				}
				{
					id: 'BottleAlphaMap'
					url: '/fallback-assets/textures/BottleMaterialAlphaMask.png'
					type: 'image'
				}
				{
					id: 'ParticleAlphaMap'
					url: '/fallback-assets/textures/ParticleMaterialAlphaMask.png'
					type: 'image'
				}
			]

			return assets

		if env.WEBGL
			addAssets(webglAssets())
		else
			addAssets(fallbackAssets())

		all = -> return mainAssets
		update = ( _assets ) -> mainAssets = _assets

		getAsset = ( id ) -> _.find( mainAssets, {id: id} )

		return {
			all 	 : all
			update 	 : update
			getAsset : getAsset
		}
