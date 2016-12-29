(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['AuthenticationService', 'currentAuth', '$location'];

  function LoginCtrl(AuthenticationService, currentAuth, $location) {
    var vm = this;

    vm.partialNavbar = "/htmls/partials/navbar.html";
    vm.login = login;

    redirect();

    ////////////

    function login() {
      var result = AuthenticationService.login();
    }

    function redirect() {
      if (currentAuth != null) {
        $location.url('/home');
      }
    }
  }

})();
