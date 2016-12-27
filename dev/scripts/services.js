(function() {
  'use strict';

  angular
    .module('fortheloveofmoney')
    .factory('authenticationFactory', authenticationFactory);

  function authenticationFactory() {
    return {

      login: function() {
        if (!firebase.auth().currentUser) {
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('https://www.googleapis.com/auth/plus.login');
          firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log('token: ', token, 'user: ', user);

          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
              alert('You have already signed up with a different auth provider for that email.');
            } else {
              // console.error(error);
            }
          });
        } else {
          firebase.auth().signOut();
          console.log('Tchau querida!');
        }
      }

    }
  }

})();