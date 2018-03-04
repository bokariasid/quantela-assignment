var angularModulesToInclude = [
    'ngRoute',
    // 'routeStyles',
    'ngStorage',
    // 'ngSanitize',
    // 'angular-loading-bar',
    // 'angularMoment'
];
var quantelaProject = angular.module('quantelaProject', angularModulesToInclude);

quantelaProject
.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
    $routeProvider.
    when('/',{
        templateUrl: 'views/login/login.html',
        controller: 'globalController',
        resolve:checkLoginStatus,
    })
    .when('/dashboard',{
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'globalController',
        resolve:checkLoginStatus,
    })
    .otherwise({
        redirectTo: '/'
    });
});

function checkLoginStatus($localStorage, $location){
    // console.log('in here');
	if($localStorage['oauthCredentials']){
        $location.path('/dashboard');
		// return false;
	} else {
        $location.path('/');
    }
}

quantelaProject.factory('authHttpResponseInterceptor',
    function($q, $localStorage, $injector, $location){
        return {
            response: function(response){
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    $localStorage.$reset();
                    $location.path('/')
                }
                if(rejection.status === 502 || rejection.status === 504){
                }
                return $q.reject(rejection);
            },
            request:function(config){
                return config;
            }
        }
    }
);