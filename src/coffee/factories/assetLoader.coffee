
JSONLoader = new class JSONLoader

	constructor: ->

		load = (asset) ->

			promise = new Promise( (fullfill, reject) ->

				req = $.ajax(asset.url, type: 'get')

				req.success (response) ->

					asset.data = response

					fullfill(asset)
				
				req.error (error) ->
					reject( error )
			
			)

			return promise

		return {
			load: load
		}

XMLLoader = new class XMLLoader

	constructor: ->

		load = (asset) ->

			promise = new Promise( (fullfill, reject) ->

				req = $.ajax(asset.url, type: 'get')

				req.success (response) ->

					asset.data = response

					fullfill(asset)
				
				req.error (error) ->
					reject( error )
			
			)

			return promise

		return {
			load: load
		}

GeometryLoader = new class GeometryLoader

	constructor: ->

		load = (asset) ->

			promise = new Promise( (fullfill, reject) ->

				loader = new THREE.JSONLoader()

				loader.load asset.url, ( geometry ) =>

					if geometry?

						asset.data = geometry

						fullfill(asset)

					else
						reject('failed to load geometry: ' + asset.id)
			
			)

			return promise

		return {
			load: load
		}

ImageLoader = new class ImageLoader

	constructor: ->

		load = (asset) ->

			promise = new Promise( (fullfill, reject) ->

				image = new Image()

				image.onload = =>
					
					asset.data = image
					
					fullfill(asset)

				image.onerror = (error) =>

					reject( 'Failed to load image: ' + asset.url )

				image.src = asset.url

			)

			return promise

		return {
			load: load
		}

window.AssetLoader = new class AssetLoader

	constructor: ->

		assets = null

		load = ( manifest ) ->

			total = manifest.length
			date  = new Date()

			loaders = []

			for asset in manifest

				switch asset.type

					when 'json'
						loaders.push( JSONLoader.load(asset) )

					when 'xml'
						loaders.push( XMLLoader.load(asset) )

					when 'image'
						loaders.push( ImageLoader.load(asset) )

					when 'geometry'
						loaders.push( GeometryLoader.load(asset) )

			promise = new Promise( (fullfill, reject) ->

				Promise.all(loaders).then( ( response ) ->

					# console.debug 'Loaded in', (new Date() - date) / 1000

					fullfill(response)

				, ( error ) ->

					reject(error)

				)

			)

			return promise

		return {
			load: load
		}