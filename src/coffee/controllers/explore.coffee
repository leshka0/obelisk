class Explore extends Controller

	constructor:( $scope, \
				  $rootScope, \
	              $location, \
	              Utils, \
	              Dictionary, \
	              Settings, \
	              Timeline, \
	              Win ) ->

		$scope.show 				 = false
		$scope.monumentReady 		 = false
		$scope.showWebgl 		 	 = false
		$scope.showFallback 		 = false
		$scope.userHasRegistered 	 = false

		# Fallback
		$scope.showMonumentBackground = if env.PHASE is '1' then false else true

		$scope.user 				 = null
		$scope.userLoggedIn 		 = false
		$scope.userNotDragging 	 = true
		$scope.showIntro 	  		 = false
		$scope.showUserPopup 		 = false
		$scope.playObjectTransition = false
		$scope.showUserTooltip 	 = false
		$scope.showClaimTooltip	 = false
		$scope.deeplinkedToSpot	 = false
		$scope.registrationOpen	 = false
		$scope.showShare 			 = false
		$scope.tooltipDirection	 = ''
		$scope.currentTooltipType   = 'claim'
		$scope.tooltip =
			x: 0
			y: 0

		$scope.isHovering = ''

		$scope.foundUser =
			firstname: 'alexandre'
			lastname: 'francois'
			city: 'Von London'
			profilePicture: ''


		$rootScope.$on('monument.ready', ->

			$scope.$apply =>

				$scope.monumentReady = true

				if env.WEBGL
					$scope.showWebgl = true
				else
					$scope.showFallback = true
		)
