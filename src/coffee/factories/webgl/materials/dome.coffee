class DomeMaterial extends Factory

	constructor: ( GUI ) ->

		return {} if env.WEBGL is false

		map = THREE.ImageUtils.loadTexture Assets.getAsset('SkyTexture').url

		params =
			map: map
			lights: false
			fog: false

		material = new THREE.MeshLambertMaterial( params )

		return {
			material: material
		}