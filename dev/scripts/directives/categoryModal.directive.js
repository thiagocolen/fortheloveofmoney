(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .directive('categoryModalDirective', categoryModalDirective);

  categoryModalDirective.$inject = ['$firebaseArray', 'FirebaseService'];

  function categoryModalDirective($firebaseArray, FirebaseService) {
    var directive = {
      bindToController: true,
      controller: categoryModalController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {},
      templateUrl: '/htmls/directives/category-modal.html'
    };

    categoryModalController.$inject = ['$scope'];

    function categoryModalController($scope) {
      var vm = this;

      // issue - será que tem um jeito melhor de fazer isso?
      FirebaseService.allCategories().then(function (data) {
        vm.categories = data;
      });

      vm.panelCategory = {};
      vm.panelCategoryAux = {};
      vm.categoryType;

      vm.editCategory = editCategory;
      vm.saveCategory = saveCategory;
      vm.deleteCategory = deleteCategory;
      vm.cleanCategoryModal = cleanCategoryModal;

      $scope.$on('manageCategories', function(event, arg) {
        openCategoryModal();
      });

      $scope.$on('cleanCategoryModal', function(event, arg) {
        vm.cleanCategoryModal();
      });

      ////////////

      function openCategoryModal() {
        vm.categoryType = 'add';        
        $('#categoryModal').modal('show');
        $('#categoryModal').on('shown.bs.modal', function(e) {
          $('#categoryForm-firstField').focus();
        });
      }

      function editCategory(category) {
        vm.categoryType = 'edit';
        vm.panelCategory = category;
        $('#categoryForm-firstField').focus();
      };

      function saveCategory() {
        if ($scope.categoryForm.$valid == true) {
          FirebaseService.saveCategory(vm.categoryType, vm.panelCategory);
        }
      };

      function deleteCategory(category) {
        vm.categories.$remove(category);
      };

      function cleanCategoryModal() {
        vm.panelCategory = {};
        vm.panelCategoryAux = {};
        vm.categoryType = 'add';
        $('#categoryForm-firstField').focus();
      };
    }

    return directive;

  }
})();
