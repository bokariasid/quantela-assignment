quantelaProject.factory('globalFactory',
function ($http, $rootScope, configWebApp, $localStorage) {
    return {
        //function for logging in user
        userLogin: function(data){
            var url = "/api/oauth/token";
            var userObject = {
                grant_type : configWebApp.grant_type,
                client_id : configWebApp.clientId,
                client_secret : configWebApp.clientSecret,
            };
            userObject.username = data.username;
            userObject.password = data.password;
            var $promise = $http.post(url, userObject);
            $promise.then(function onSuccess(response){
                if(response.data){
                    // cookieService.setObj('userOauthDetails', response.data);
                }
            })
            .catch(function onError(err){
            });
            return $promise;
        },
        setUserData:function(key, value){
            $localStorage[key] = value;
        },
        getUserData:function(key){
            return $localStorage[key];
        },
        getDeviceDetails:function() {
            // body...
            var url = "/api/os_details";
            var accessToken = $localStorage['oauthCredentials']['access_token']
            var $promise = $http.get(url, {headers:{Authorization : 'Bearer '+accessToken}});
            $promise.then(function onSuccess(response){
                // console.log(response.data);
            })
            .catch(function onError(err){
            });
            return $promise;
        }
    }
});