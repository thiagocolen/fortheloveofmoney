(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('helperDirective', helperDirective);

  function helperDirective() {
    var directive = {
      bindToController: true,
      controller: helperController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {},
      templateUrl: 'assets/htmls/shared/helper/helper.html'
    };

    helperController.$inject = ['$scope'];

    return directive;

    function helperController($scope) {
      /* eslint no-invalid-this: 0*/
      var vm = this;

      vm.openHelperModal = openHelperModal;

      $scope.$on('openHelperModal', function (event, arg) {
        openHelperModal();
      });

      // //////////

      function openHelperModal() {
        $('#helperModal').modal('show');
      }
    }
  }
})();
