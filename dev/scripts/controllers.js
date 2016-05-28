var fortheloveofmoneyControllers = angular.module('fortheloveofmoneyControllers', ['firebase', 'firebase.ref', 'chart.js', 'cfp.hotkeys']);


fortheloveofmoneyControllers.controller("CategoriesCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "Ref",
    function($scope, $firebaseArray, $firebaseObject, Ref) {

        $scope.categories = $firebaseArray(Ref.child('/categories'));

        $scope.saveCategory = function() {
            var list = $firebaseArray(Ref.child('/categories'));

            list.$add($scope.newCategory).then(function(ref) {
                var id = ref.key();
                list.$indexFor(id); // returns location in the array
                $scope.newCategory = '';
            });
        };

        $scope.deleteCategory = function(category) {
            $scope.categories.$remove(category);
        }
    }
]);


fortheloveofmoneyControllers.controller("HomeCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "Ref", "$filter", "hotkeys",
    function($scope, $firebaseArray, $firebaseObject, Ref, $filter, hotkeys) {

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

            if (type == 'add' && $scope.panelForm.$valid == true) {
                $scope.panelTransaction.date = $scope.panelTransactionAux.dateInput.toJSON();
                $scope.transactions.$add($scope.panelTransaction).then(function(ref) {
                    $scope.panelTransactionAux = {};
                    $scope.panelTransaction = {};
                    $scope.panelControl('close');
                });
            }

            if (type == 'edit' && $scope.panelForm.$valid == true) {
                var transactionRecord = $scope.transactions.$getRecord($scope.panelTransactionAux.id);
                transactionRecord.date = $scope.panelTransactionAux.dateInput.toJSON();
                transactionRecord.description = $scope.panelTransaction.description;
                transactionRecord.value = $scope.panelTransaction.value;
                transactionRecord.category = $scope.panelTransaction.category;

                $scope.transactions.$save(transactionRecord).then(function() {
                    $scope.panelTransactionAux = {};
                    $scope.panelTransaction = {};
                    $scope.panelControl('close');
                });
            }
        };

        $scope.deleteTransaction = function(transaction) {
            // -----------------------------------------------
            $scope.transactions.$remove(transaction);
        };

        $scope.editTransaction = function(transaction) {
            $scope.panelControl('edit');

            $scope.panelTransactionAux.id = transaction.$id;

            var ano = Number(transaction.date.substr(0, 4));
            var mes = Number(transaction.date.substr(5, 2)) - 1;
            var dia = Number(transaction.date.substr(8, 2));
            $scope.panelTransactionAux.dateInput = new Date(ano, mes, dia);

            $scope.panelTransaction.description = transaction.description;
            $scope.panelTransaction.value = transaction.value;
            $scope.panelTransaction.category = transaction.category;
        };

        $scope.panelControl = function(type) {

            $scope.panelType = type;

            if (type == 'add') {
                $scope.panelClass = 'panel panel-danger';
                $scope.transaction = '';
                $scope.dateInput = '';
                $scope.panelTitle = 'Add Transaction';
                $scope.openedPanel = true;
            }

            if (type == 'edit') {
                $scope.panelClass = 'panel panel-primary';
                $scope.panelTitle = 'Edit Transaction';
                $scope.openedPanel = true;
            }

            if (type == 'close') {
                $scope.openedPanel = false;
                $scope.panelTitle = '';
            }

            var setFocus = function() {
                $('#tabindex-first').focus();
            }

            setTimeout(setFocus, 500);
        };

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
            combo: 'a t',
            description: 'Add new transaction',
            callback: function() {
                $scope.panelControl('add');
                console.log('hotkeys - add');
            }
        });

        hotkeys.add({
            combo: 'alt+c',
            description: 'Close Transaction Panel',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function() {
                $scope.panelControl('close');
                console.log('hotkeys - close');
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
