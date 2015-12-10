class BaseMaterial extends Factory

	constructor: ( GUI, Detect ) ->

		return {} if env.WEBGL is false

		map 	= THREE.ImageUtils.loadTexture Assets.getAsset('BaseTexture').url
		bumpmap = THREE.ImageUtils.loadTexture Assets.getAsset('BaseTextureBump').url

		params =
			map: map
			specular: 0x101218
			shininess: 80
			bumpMap: bumpmap
			specularMap: bumpmap
			bumpScale: 1

		material = new THREE.MeshPhongMaterial( params )

		return {
			material: material
		}