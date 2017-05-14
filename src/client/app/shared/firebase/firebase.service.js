(function () {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .service('FirebaseService', FirebaseService);

  FirebaseService.$inject = [
    '$firebaseArray',
    '$rootScope',
    '$q',
    'localStorageService'
  ];

  function FirebaseService(
    $firebaseArray,
    $rootScope,
    $q,
    localStorageService
  ) {
    var service = {
      saveTransaction: saveTransaction,
      deleteTransaction: deleteTransaction,
      allCategories: allCategories,
      saveCategory: saveCategory,
      allTransactions: allTransactions,
      chartData: chartData,
      userVerification: userVerification,
      loggedUserId: loggedUserId
    };

    return service;

    function saveTransaction(type, transaction) {
      var Ref = firebase.database().ref();
      var transactions = $firebaseArray(Ref.child('/transactions'));

      if (type == 'newTransaction') {
        // issue - this line is a shit
        transaction.panelTransaction.date =
          transaction.panelTransactionAux.dateInput.toJSON();
        transactions.$loaded().then(function () {
          transactions.$add(transaction.panelTransaction).then(function (ref) {
            $rootScope.$broadcast('closeTransactionModal');
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

    function allCategories() {
      return $q(function (resolve, reject) {
        var Ref = firebase.database().ref();
        var categories = $firebaseArray(Ref.child('/categories'));
        categories.$loaded().then(function () {
          resolve(categories);
        });
      });
    }

    function saveCategory(type, category) {
      var Ref = firebase.database().ref();
      var categories = $firebaseArray(Ref.child('/categories'));

      if (type == 'add') {
        categories.$add(category).then(function () {
          $rootScope.$broadcast('cleanCategoryModal');
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

    function allTransactions() {
      return $q(function (resolve, reject) {
        var Ref = firebase.database().ref();
        var transactions = $firebaseArray(Ref.child('/transactions'));
        transactions.$loaded().then(function () {
          resolve(transactions)
        });
      });
    }

    function chartData() {
      return $q(function (resolve, reject) {
        var Ref = firebase.database().ref();
        var chartData;
        Ref
          .child('/transactions')
          .orderByChild('date')
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
    // firebase:authUser:AIzaSyBRQPk951Ca2REMDC-OeUBPLuNLZwbAPKw:[DEFAULT]
    function loggedUserId() {
      console.log('localStorageService:', localStorageService);
      var teste = localStorageService.length();
      console.log('teste: ', teste);
      localStorageService.set('USERID', {
        // 'asdasd' : '13123'
      });
      // console.log('loggedUserId: ', loggedUserId);
    }
  }
})();
