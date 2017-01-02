(function() {
  'use strict'; 

  angular
    .module('fortheloveofmoney')
    .service('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$firebaseAuth', '$location'];

  function AuthenticationService($firebaseAuth, $location) {

    var service = {
      login: login,
      logout: logout
    };

    return service;

    function login() {
      var authObj = $firebaseAuth();
      authObj.$signInWithPopup("google").then(function(result) {
        $location.url('/home');
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }

    function logout() {
      console.log('Authentication: logout');
      var authObj = $firebaseAuth();
      authObj.$signOut().then(function () {
        $location.url('/login');  
      });
    }
    
  }

})();
