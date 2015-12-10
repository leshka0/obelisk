class Dictionary extends Factory

	constructor: ->

		data = $( Assets.getAsset('Dictionary').data )

		get = ( key ) ->

			if data.find( key ).length
				return data.find( key ).text()
			else
				return "Dictionary field doesn't exist."

		return {
			get  : get
		}