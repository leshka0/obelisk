class FadeTo extends Animation
	
	constructor: ( $rootScope ) ->

		duration = 1
		
		return {

			addClass: (element, className, done) ->

				# fade out
				
				if className == 'ng-hide'

					TweenMax.killTweensOf( element )
					TweenMax.set( element, opacity: 1 )
 
					params =
						opacity: 0
						onComplete: done
						ease: Power2.easeOut
	 
					TweenMax.to( element, duration, params )
				
				else
					done()
							
			removeClass: (element, className, done) ->

				# fade in

				if className == 'ng-hide'

					TweenMax.killTweensOf( element )
					TweenMax.set( element, opacity: 0, position: 'absolute' )
 
					params =
						opacity: 1
						delay: 1.1
						onStart: =>
							element.attr('style', '')
						onComplete: done
						ease: Power2.easeOut
	 
					TweenMax.to( element, duration, params )
				
				else
					done()

		}