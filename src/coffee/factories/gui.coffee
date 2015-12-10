class GUI extends Factory

	constructor: ->

		debug = env.GUI

		class Folder
			add:      -> return @
			listen:   -> return @
			name:     -> return @
			open:     -> return @
			onChange: -> return @
			addFolder: -> new Folder
			addColor: -> return @

		class GUIWrapper

			add:       -> return @
			addFolder: -> new Folder
			name:      -> return @
			close:     -> return @
			step: -> return @
			onChange: -> return @
			setValue: -> return @
			listen: -> return @

		if debug
			gui = new dat.GUI(width: 350)
			gui.close()
		else
			gui = new GUIWrapper

		return gui