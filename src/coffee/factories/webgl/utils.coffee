Number::map = (in_min, in_max, out_min, out_max) ->
	(this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

_.mixin 'findByValues': (collection, property, values) ->
  _.filter collection, (item) ->
    _.contains values, item[property]

class Utils extends Factory

	constructor: ( Win, $location ) ->

		lerp = ( min, max, alpha ) ->
			min + ((max - min) * alpha)

		delay = ( delay, func ) ->
			setTimeout func, delay * 1000

		degrees = ( radians ) ->
			radians * (180 / Math.PI)

		radians = ( degrees ) ->
			degrees * (Math.PI / 180)

		randomArrayItem = ( array ) ->
			index = Math.floor(Math.random()*array.length)

			return {
				index: index
				item: array[index]
			}

		getPath = ->
			return $location.path().replace('/'+env.LOCALE, '')

		getUriSegment = ( index ) ->

			return getPath().split('/')[index] or false

		getDeeplinkUserIndex = ->

			index = getPath().split('/')[2]

			if index
				return Number(index)
			else
				return false

		closestBottleToCamera = ( bottles, cameraPosition ) ->

			distances = []

			for bottle in bottles

				distances.push( bottle.position.distanceTo(cameraPosition) )

			minDistance = Infinity
			minDistanceIndex = -1

			for distance, i in distances
				if distance < minDistance
					minDistanceIndex = i
					minDistance 	 = distance

			return minDistanceIndex

		closestParticleToCamera = ( vertices, cameraPosition ) ->

			distances = []

			for v in vertices

				distances.push( v.distanceTo(cameraPosition) )

			minDistance = Infinity
			minDistanceIndex = -1

			for distance, i in distances
				if distance < minDistance
					minDistanceIndex = i
					minDistance 	 = distance

			return minDistanceIndex

		###
		https://github.com/mrdoob/three.js/issues/78
		###
		toScreenPosition = (vector, camera) ->
			
			# map to normalized device coordinate (NDC) space
			vector.project camera
			# map to 2D screen space
			vector.x = Math.round((vector.x + 1) * Win.width / 2)
			vector.y = Math.round((-vector.y + 1) * Win.height / 2)
			vector.z = 0
			
			return {
				x: vector.x
				y: vector.y
			}

		return {
			lerp: lerp
			degrees: degrees
			radians: radians
			delay: delay
			toScreenPosition: toScreenPosition
			randomArrayItem: randomArrayItem
			closestBottleToCamera: closestBottleToCamera
			closestParticleToCamera: closestParticleToCamera
			getDeeplinkUserIndex: getDeeplinkUserIndex
			getUriSegment: getUriSegment
			getPath: getPath
		}