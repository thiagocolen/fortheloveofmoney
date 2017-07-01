'use strict';

var loginTemplate = require('./login.html');

angular
  .module('fortheloveofmoney')
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/login', {
          templateUrl: loginTemplate,
          controller: 'LoginCtrl',
          controllerAs: 'vm',
          resolve: {
            // controller will not be loaded until $waitForSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            'currentAuth': ['Auth', function (Auth) {
              console.log('qualé');
              // $waitForSignIn returns a promise so the
              // resolve waits for it to complete
              return Auth.$waitForSignIn();
            }]
          }
        }).
        otherwise({ redirectTo: '/login' });
    }
  ]);


angular
  .module('fortheloveofmoney')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['AuthenticationService', 'currentAuth', '$location'];

function LoginCtrl(AuthenticationService, currentAuth, $location) {
  var vm = this;

  vm.login = login;

  redirect();
  console.log('loginCtrl!');

  // ----------

  function login() {
    AuthenticationService.login();
  }

  function redirect() {
    if (currentAuth != null) {
      $location.url('/home');
    }
  }
}
