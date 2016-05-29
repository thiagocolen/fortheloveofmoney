var fortheloveofmoneyControllers = angular.module('fortheloveofmoneyControllers', ['firebase', 'firebase.ref', 'chart.js', 'cfp.hotkeys']);


fortheloveofmoneyControllers.controller("CategoriesCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "Ref",
    function($scope, $firebaseArray, $firebaseObject, Ref) {



    }
]);


fortheloveofmoneyControllers.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "Ref", "$filter", "hotkeys",
    function($scope, $firebaseArray, $firebaseObject, Ref, $filter, hotkeys) {

        $scope.partialNavbar = "/htmls/partials/navbar.html";
        $scope.partialHomeChart = "/htmls/partials/chart.html";
        $scope.partialTransactionModal = "/htmls/partials/transaction-modal.html";
        $scope.partialCategoryModal = "/htmls/partials/category-modal.html";


        Ref.child('/transactions').orderByChild("date").on("value", function(snapshot, $filter) {

            // chart-labels="labels" 
            $scope.labels = [];
            // chart-series="series"
            $scope.series = ["CC"];
            // chart-data="data" 
            $scope.data = [];
            // chart-legend="true" 

            var line = [];
            $scope.values = [];

            snapshot.forEach(function(data) {
                // console.log("key: " + data.key() + " : " + data.val().date + " : " + data.val().value);

                var chave = data.key();
                var valor = data.val().value;
                var label = data.val().date;

                line.push(valor);
                $scope.labels.push(label.substr(0, 10));
            });

            $scope.data.push(line);
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        $scope.categories = $firebaseArray(Ref.child('/categories'));
        $scope.transactions = $firebaseArray(Ref.child('/transactions'));
        $scope.panelTransaction = {};
        $scope.panelTransactionAux = {};

        $scope.saveTransaction = function(type) {
            if (type == 'add' && this.transactionForm.$valid == true) {
                $scope.panelTransaction.date = $scope.panelTransactionAux.dateInput.toJSON();
                $scope.transactions.$add($scope.panelTransaction).then(function(ref) {
                    $scope.panelTransactionAux = {};
                    $scope.panelTransaction = {};
                    $('#transactionModal').modal('hide');
                });
            }
            if (type == 'edit' && this.transactionForm.$valid == true) {
                var transactionRecord = $scope.transactions.$getRecord($scope.panelTransactionAux.id);
                transactionRecord.date = $scope.panelTransactionAux.dateInput.toJSON();
                transactionRecord.description = $scope.panelTransaction.description;
                transactionRecord.value = $scope.panelTransaction.value;
                transactionRecord.category = $scope.panelTransaction.category;

                $scope.transactions.$save(transactionRecord).then(function() {
                    $scope.panelTransactionAux = {};
                    $scope.panelTransaction = {};
                    $('#transactionModal').modal('hide');
                });
            }
        };

        $scope.cleanTransactionForm = function() {
            $('#transactionModal').on('hidden.bs.modal', function(e) {
                $scope.panelTransactionAux = {};
                $scope.panelTransaction = {};
            });
        };

        $scope.deleteTransaction = function(transaction) {
            $scope.transactions.$remove(transaction);
        };

        $scope.editTransaction = function(transaction) {
            $scope.transactionType = 'edit';
            $scope.panelTitle = 'Edit Transaction';

            $scope.panelTransactionAux.id = transaction.$id;

            var ano = Number(transaction.date.substr(0, 4));
            var mes = Number(transaction.date.substr(5, 2)) - 1;
            var dia = Number(transaction.date.substr(8, 2));
            $scope.panelTransactionAux.dateInput = new Date(ano, mes, dia);

            $scope.panelTransaction.description = transaction.description;
            $scope.panelTransaction.value = transaction.value;
            $scope.panelTransaction.category = transaction.category;

            $('#transactionModal').modal('show');
            $('#transactionModal').on('shown.bs.modal', function(e) {
                $('#transactionForm-firstField').focus();
            });
        };

        $scope.newTransaction = function() {
            $scope.transactionType = 'add';

            $scope.panelTransactionAux = {};
            $scope.panelTransaction = {};
            $scope.panelTitle = 'New Transaction';

            $('#transactionModal').modal('show');
            $('#transactionModal').on('shown.bs.modal', function(e) {
                $('#transactionForm-firstField').focus();
            });
        };

        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        $scope.panelCategory = {};
        $scope.panelCategoryAux = {};
        $scope.categoryType = '';

        $scope.manageCategories = function() {
            $scope.categoryType = 'add';

            $('#categoryModal').modal('show');
            $('#categoryModal').on('shown.bs.modal', function(e) {
                $('#categoryForm-firstField').focus();
            });
        };

        $scope.editCategory = function(category) {
            $scope.categoryType = 'edit';
            $scope.panelCategory.name = category.name;
            $scope.panelCategoryAux.id = category.$id;

            $('#categoryForm-firstField').focus();
        };

        $scope.saveCategory = function() {
            if ($scope.categoryType == 'add' && this.categoryForm.$valid == true) {
                var list = $firebaseArray(Ref.child('/categories'));

                list.$add(this.panelCategory).then(function() {
                    $scope.cleanCategoryForm();
                    $('#categoryForm-firstField').focus();
                });
            }

            if ($scope.categoryType == 'edit' && this.categoryForm.$valid == true) {
                var categoryRecord = $scope.categories.$getRecord($scope.panelCategoryAux.id);
                categoryRecord.name = this.panelCategory.name;
                $scope.categories.$save(categoryRecord).then(function() {
                    $scope.panelCategoryAux = {};
                    $scope.panelCategory = {};
                });
            }

            $scope.categoryType = 'add';
        };

        $scope.deleteCategory = function(category) {
            $scope.categories.$remove(category);
        };

        $scope.cleanCategoryForm = function() {
            console.log('cleanCategoryForm');
            $scope.panelCategory = {};
            $scope.panelCategoryAux = {};
        };

        // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        $scope.getTotal = function() {
            var total = 0;
            for (var i = 0; i < $scope.transactions.length; i++) {
                var transaction = $scope.transactions[i];
                total += transaction.value;
            }
            return total;
        };

        $scope.predicate = 'date';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        hotkeys.add({
            combo: 'alt+t',
            description: 'Add New Transaction',
            callback: function() {
                $scope.newTransaction();
            }
        });

        hotkeys.add({
            combo: 'alt+c',
            description: 'Manage Categories',
            callback: function() {
                $scope.manageCategories();
            }
        });

    }
]);


fortheloveofmoneyControllers.filter('categoryFilter', ['Ref',
    function(Ref) {

        // if (category) {
        //     console.log('category');
        // } else {
        //     console.log('www');
        // }

        return function(category) {
            var categoryName;

            Ref.child('/categories/' + category).on("value", function(snapshot) {
                // console.log(snapshot.val().name);
                categoryName = snapshot.val().name;

            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            return categoryName;
        };
    }
]);
