(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'AuthenticationService', '$firebaseAuth', 'currentAuth'];

  function LoginCtrl($scope, AuthenticationService, $firebaseAuth, currentAuth) {
    $scope.partialFooter = "/htmls/partials/footer.html";
    $scope.partialNavbar = "/htmls/partials/navbar.html";
    $scope.partialLogin = "/htmls/partials/login.html";

    $scope.login = function() {
      var result = AuthenticationService.login();
    }

    $scope.logout = function() {
      AuthenticationService.logout();
    }

    $scope.getAuth = function() {
      AuthenticationService.getAuth();
    }


    var authObj = $firebaseAuth();
    authObj.$onAuthStateChanged(function(firebaseUser) {
      console.log('getAuth ->');
      if (firebaseUser) {
        console.log("getAuth -> Signed in as:", firebaseUser);
      } else {
        console.log("getAuth -> Signed out");
      }
    });

  }

})();
