(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
        when('/home', {
          templateUrl: 'htmls/views/home.html',
          controller: 'HomeCtrl',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
              // $waitForSignIn returns a promise so the resolve waits for it to complete
              return Auth.$requireSignIn();
            }]
          }
        }).
        when('/login', {
          templateUrl: 'htmls/views/login.html',
          controller: 'LoginCtrl',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
              // $waitForSignIn returns a promise so the resolve waits for it to complete
              return Auth.$waitForSignIn();
            }]
          }
        }).
        otherwise({redirectTo:'/login'});
      }
    ]);

})();
