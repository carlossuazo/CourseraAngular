'use strict';

/**
 * @ngdoc overview
 * @name angularYeomanApp
 * @description
 * # angularYeomanApp
 *
 * Main module of the application.
 */
angular
  .module('angularYeomanApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
