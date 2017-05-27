(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .service('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = [
    '$firebaseAuth',
    '$location',
    '$firebaseObject',
    'FirebaseService'
  ];

  function AuthenticationService(
    $firebaseAuth,
    $location,
    $firebaseObject,
    FirebaseService
  ) {
    var service = {
      login: login,
      logout: logout
    };

    return service;

    function login() {
      var authObj = $firebaseAuth();
      authObj.$signInWithPopup('google').then(function (result) {
        verifyNewUser(result);
        $location.url('/home');
      }).catch(function (error) {
        console.error('Authentication failed:', error);
      });
    }

    function logout() {
      var authObj = $firebaseAuth();
      authObj.$signOut().then(function () {
        $location.url('/login');
      });
    }

    function verifyNewUser(data) {
      var user = {};
      user.displayName = data.user.displayName;
      user.uid = data.user.uid;
      FirebaseService.userVerification(user);
    }
  }
})();
