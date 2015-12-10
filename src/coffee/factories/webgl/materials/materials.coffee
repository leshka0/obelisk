class Materials extends Factory

	constructor: ( ParticleMaterial, \
	              ParticleZoomMaterial, \
	              BottleMaterial, \
	              BottleZoomMaterial, \
	              GroundMaterial, \
	              BaseMaterial, \
	              DomeMaterial, \
	              HatMaterial ) ->

		return {
			BottleMaterial: BottleMaterial
			BottleZoomMaterial: BottleZoomMaterial
			ParticleMaterial: ParticleMaterial
			DomeMaterial: DomeMaterial
			ParticleZoomMaterial: ParticleZoomMaterial
			GroundMaterial: GroundMaterial
			BaseMaterial: BaseMaterial
			HatMaterial: HatMaterial
		}