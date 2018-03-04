quantelaProject.controller('globalController', function ($rootScope, $scope, $http, globalFactory, $location, socket) {
	$scope.osDetails = [];
	$scope.userLogin = function() {
		// body...
		var data = {
			username:$scope.username,
			password:$scope.password,
		};
		globalFactory.userLogin(data)
		.then(function successCallback(response) {
			globalFactory.setUserData('oauthCredentials', response.data);
			$location.path('/dashboard');
        }, function errorCallback(response) {
			console.log(response);
        });
	};

	$scope.getDeviceDetails = function() {
		// body...
		globalFactory.getDeviceDetails()
		.then(function successCallback(response) {
			$scope.osDetails = response.data;
        }, function errorCallback(response) {
			console.log(response);
        });
	};

	$scope.checkLoginStatus = function() {
		var oauthDetails = globalFactory.getUserData('oauthCredentials');
		console.log(oauthDetails);
		if(oauthDetails){
			$location.path('/dashboard');
		}
	};
	socket.on('data-update', function(data) {
		$scope.$apply(function () {
			$scope.osDetails = $scope.osDetails.concat(data);
			// This strategy can be used to get the updates which might have been missed.
			// $scope.osDetails = data;
		});
	});
});