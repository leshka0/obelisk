class Detect extends Factory

	constructor: ->

		md = new MobileDetect(window.navigator.userAgent)

		mobile = if _.isString(md.mobile()) then true else false
		tablet = if _.isString(md.tablet()) then true else false
		device = mobile or tablet

		if mobile is false and tablet is false
			desktop = true
		else
			desktop = false

		if tablet
			mobile = false

		notMobile = mobile is false

		return {
			mobile: mobile
			tablet: tablet
			desktop: desktop
			notMobile: notMobile
			device: device
			firefox: bowser.firefox
			ie: bowser.msie
			version: bowser.version
		}
