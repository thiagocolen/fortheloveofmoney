(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .service('FirebaseService', FirebaseService);

  FirebaseService.$inject = [
    '$firebaseArray',
    '$rootScope',
    '$q'
  ];

  function FirebaseService(
    $firebaseArray,
    $rootScope,
    $q
  ) {
    var service = {
      saveTransaction: saveTransaction,
      deleteTransaction: deleteTransaction,
      allCategories: allCategories,
      saveCategory: saveCategory,
      allTransactions: allTransactions,
      chartData: chartData,
      userVerification: userVerification
    };

    return service;


    function getCurrentUserOwnerKey(currentAuth) {
      return $q(function (resolve, reject) {
        var Ref = firebase.database().ref();
        var users = $firebaseArray(Ref.child('/users'));

        users.$loaded().then(function () {
          angular.forEach(users, function (value, key) {
            if (value.uid == currentAuth.uid) {
              resolve(value.$id);
            }
          });
        });
      });
    }

    function saveTransaction(type, transaction, currentAuth) {
      var Ref = firebase.database().ref();
      var transactions = $firebaseArray(Ref.child('/transactions'));

      if (type == 'newTransaction') {
        // issue - this line is a shit
        transaction.panelTransaction.date =
          transaction.panelTransactionAux.dateInput.toJSON();

        getCurrentUserOwnerKey(currentAuth).then(function (result) {
          transaction.panelTransaction.owner = result;
          transactions.$loaded().then(function () {
            transactions.$add(transaction.panelTransaction)
              .then(function (ref) {
                $rootScope.$broadcast('closeTransactionModal');
              });
          });
        });
      }

      if (type == 'editTransaction') {
        var transactionRecord;

        transactions.$loaded().then(function () {
          transactionRecord =
            transactions.$getRecord(transaction.panelTransactionAux.id);
          // issue - this line is a shit
          transactionRecord.date =
            transaction.panelTransactionAux.dateInput.toJSON();

          transactionRecord.description =
            transaction.panelTransaction.description;

          transactionRecord.value =
            transaction.panelTransaction.value;

          transactionRecord.category =
            transaction.panelTransaction.category;

          transactions.$save(transactionRecord).then(function () {
            $rootScope.$broadcast('closeTransactionModal');
          });
        });
      }
    }

    function deleteTransaction(id) {
      var Ref = firebase.database().ref();
      var transactions = $firebaseArray(Ref.child('/transactions'));

      transactions.$loaded().then(function () {
        var transactionToDelete = transactions.$getRecord(id);
        transactions.$remove(transactionToDelete);
      });
    }

    function allCategories(currentAuth) {
      return $q(function (resolve, reject) {
        var Ref = firebase.database().ref();

        getCurrentUserOwnerKey(currentAuth).then(function (result) {
          var categories = $firebaseArray(Ref.child('/categories')
            .orderByChild('owner').equalTo(result));
          categories.$loaded().then(function () {
            resolve(categories);
          });
        });
      });
    }

    function saveCategory(type, category, currentAuth) {
      var Ref = firebase.database().ref();
      var categories = $firebaseArray(Ref.child('/categories'));

      if (type == 'add') {
        getCurrentUserOwnerKey(currentAuth).then(function (result) {
          category.owner = result;
          categories.$add(category).then(function () {
            $rootScope.$broadcast('cleanCategoryModal');
          });
        });
      }

      if (type == 'edit') {
        categories.$loaded().then(function () {
          var categoryRecord = categories.$getRecord(category.$id);
          categoryRecord.name = category.name;
          categories.$save(categoryRecord).then(function () {
            $rootScope.$broadcast('cleanCategoryModal');
          });
        });
      }
    }

    function allTransactions(currentAuth) {
      return $q(function (resolve, reject) {
        var Ref = firebase.database().ref();

        getCurrentUserOwnerKey(currentAuth).then(function (result) {
          var transactions = $firebaseArray(Ref.child('/transactions')
            .orderByChild('owner').equalTo(result));
          transactions.$loaded().then(function () {
            resolve(transactions);
          });
        });
      });
    }

    function chartData(currentAuth) {
      return $q(function (resolve, reject) {
        var Ref = firebase.database().ref();
        var chartData;

        getCurrentUserOwnerKey(currentAuth).then(function (result) {
          var transactions = $firebaseArray(Ref.child('/transactions')
            .orderByChild('owner').equalTo(result));
          transactions.$loaded().then(function () {
            console.log('!!!@@@', 'transactions:', transactions);
            // resolve(transactions);
          });
        });

        Ref.child('/transactions').orderByChild('date')
          .on('value', function (snapshot, $filter) {
            var line = [];
            var labels = [];
            var currentBalance = 0;

            snapshot.forEach(function (data) {
              // var chave = data.key;
              var label = data.val().date;
              currentBalance = data.val().value + currentBalance;
              line.push(currentBalance);
              labels.push(label.substr(0, 10));
            });

            chartData = {
              line: line,
              labels: labels,
              currentBalance: currentBalance
            };
            resolve(chartData);
          }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
          });
      });
    }

    function userVerification(user) {
      var Ref = firebase.database().ref();
      var users = $firebaseArray(Ref.child('/users'));
      var newUser;

      users.$loaded().then(function () {
        angular.forEach(users, function (value, key) {
          if (value.uid == user.uid) {
            newUser = false;
          }
        });
        if (newUser != false) {
          users.$add(user).then(function (ref) {
            console.log('$added user: ', user);
          });
        }
      });
    }
  }
})();
