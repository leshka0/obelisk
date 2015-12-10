class TwistModifier extends Factory

	constructor: ->

		@_angle = 0


		angle = ( @_angle = 0 ) =>

		twist = ( vector, i ) =>

			# radius of circle
			# radius = 

			# console.log vector, i, len, radius

			axis = new THREE.Vector3( 0, 1, 0 )

			phase = 0.1

			vector.applyAxisAngle( axis, @_angle * i * phase )

			return vector

		twistAndTaper = ( vector, i, taper, taperScale, gradient ) =>

			axis = new THREE.Vector3( 0, 1, 0 )

			phase = 0.0005

			vector.applyAxisAngle( axis, (@_angle * i * phase) * gradient )
			scalar = 1 + ((i * (taperScale)) * taper) * gradient

			vector.x *= scalar
			vector.z *= scalar

			return vector

		return {
			twist: twist
			twistAndTaper: twistAndTaper
			angle: angle
		}