class Data extends Service

	constructor: ->

		getCountdown = ->

			date = env.COUNTDOWN

			_now = moment()
			_end = date.split('-')

			now = moment([_now.year(), _now.month(), _now.date()])
			end = moment([_end[0], _end[1]-1, _end[2]])

			return end.diff(now, 'days')

		return {
			getCountdown: getCountdown
		}