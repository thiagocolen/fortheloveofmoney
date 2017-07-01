'use strict';

global.jQuery = require('jquery');
require('bootstrap');
require('angular');
require('angular-route');
require('angular-local-storage');
require('firebase');
require('angularfire');
require('chart.js');
require('angular-chart.js');
require('angular-hotkeys');

require('./firebase-config.js');


angular
  .module('fortheloveofmoney', [
    'ngRoute',
    'LocalStorageModule',
    'firebase',
    'chart.js',
    'cfp.hotkeys'
  ]);


require('./components/login/loginController.js');
require('./components/home/homeController.js');
require('./config.js');
require('./filters.js');
require('./routes.js');
require('./run.js');
