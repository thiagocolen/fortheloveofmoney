(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('footerDirective', footerDirective);

  function footerDirective() {
    var directive = {
      link: link,
      restrict: 'EA',
      templateUrl: 'assets/htmls/shared/footer/footer.html',
      scope: {}
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();
