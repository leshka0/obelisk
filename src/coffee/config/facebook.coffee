class FacebookConfig extends Config

	constructor: ( FacebookProvider ) ->
		FacebookProvider.init(env.FACEBOOK_APP_ID)