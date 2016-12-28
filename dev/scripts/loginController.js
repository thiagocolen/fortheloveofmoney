(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['AuthenticationService', '$firebaseAuth', 'currentAuth', '$location'];

  function LoginCtrl(AuthenticationService, $firebaseAuth, currentAuth, $location) {
    var vm = this;

    vm.partialFooter = "/htmls/partials/footer.html";
    vm.partialNavbar = "/htmls/partials/navbar.html";
    vm.partialLogin = "/htmls/partials/login.html";
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
