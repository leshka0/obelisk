class GroundMaterial extends Factory

	constructor: ( GUI ) ->

		return {} if env.WEBGL is false

		map 	= THREE.ImageUtils.loadTexture Assets.getAsset('FloorTexture').url
		bumpmap = THREE.ImageUtils.loadTexture Assets.getAsset('FloorTextureBump').url

		params =
			# color: 0xFFFFFF
			# wireframe: off
			map: map
			bumpMap: bumpmap
			bumpScale: 2
			specular: 0x101218
			specularMap : bumpmap
			shininess: 60
			side: THREE.DoubleSide
			

		material = new THREE.MeshPhongMaterial( params )

		GUI.add(material, 'bumpScale', 0, 100)

		return {
			material: material
		}