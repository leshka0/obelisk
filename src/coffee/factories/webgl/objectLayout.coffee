class ObjectLayout extends Factory

	constructor: ( lodash ) ->

		data 		   = []
		totalBottles   = 0
		totalParticles = 0
		dataOrdered    = []

		count = 0

		generate = ->

			for row in [0...25]

				data[row] = []

				# Each side of tower
				for side in [0...4]

					data[row][side] = []

					bottleIndices = [0...12]

					# remove random indices for bottle
					# rest are particles
					bottleIndices = lodash.shuffle(bottleIndices)

					if env.WEBGL
						bottleIndices = bottleIndices.splice(0, 2)
					else
						bottleIndices = bottleIndices.splice(0, 6)

					# each column 
					for col in [0...12]

						if col in bottleIndices
							type = 'bottle'
							totalBottles++
						else
							type = 'particle'
							totalParticles++

						data[row][side].push( type )

						dataOrdered.push(type)

						count++

						if env.WEBGL is false and count >= 200
							# console.log 'break'
							return

		generate()

		getFormatted = -> return data
		getOrder = -> return dataOrdered
		getTotalBottles = -> return totalBottles
		getTotalParticles = -> return totalParticles

		return {
			getTotalBottles: getTotalBottles
			getTotalParticles: getTotalParticles
			getFormatted: getFormatted
			getOrder: getOrder
		}