class ParticleMaterial extends Factory

	constructor: ( Fog, Settings ) ->

		return {} if env.WEBGL is false

		params =
			size: 20
			map: THREE.ImageUtils.loadTexture Assets.getAsset('Particle').url
			transparent: true
			alphaTest: 0.1
			fog: true

		material = new THREE.PointCloudMaterial( params )

		hideParticle = ( index ) ->

		showParticle = ( index ) ->

		return {
			material: material
			hideParticle: hideParticle
			showParticle: showParticle
		}