(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
        when('/home', {
          templateUrl: 'htmls/views/home.html',
          controller: 'HomeCtrl'
        }).
        when('/login', {
          templateUrl: 'htmls/views/login.html',
          controller: 'LoginCtrl'
        }).
        otherwise({
          redirectTo: '/home'
        });
      }
    ]);

})();
