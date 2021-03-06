(function() {
  'use strict';

  angular
    .module('happit', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ionic-timepicker', 'chart.js', 'ngMaterial', 'materialCalendar'])
    .config(routeHandler)
    .config(function($mdGestureProvider) {
      $mdGestureProvider.skipClickHijack();
    })
    .run(runBlock);

    routeHandler.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider']
    runBlock.$inject = ['$ionicPlatform', '$rootScope', '$location', '$window'];


    function routeHandler($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'partials/home.html',
          controller: 'HabitsCtrl as ctrl',
          restricted: true,
        })
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login.html',
          controller: 'AuthCtrl as ctrl',
          preventWhenLoggedIn: true
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'partials/settings.html',
          controller: 'UserCtrl as ctrl',
          restricted: true
        })
        .state('habit', {
          url: '/habit/:id',
          templateUrl: 'partials/habit.html',
          controller: 'HabitCtrl as ctrl',
          restricted: true
        })
        .state('new', {
          url: '/new',
          templateUrl: 'partials/new.html',
          controller: 'HabitCtrl as ctrl',
          restricted: true
        })
        .state('edit', {
          url: '/edit/:id',
          templateUrl: 'partials/edit.html',
          controller: 'HabitCtrl as ctrl',
          restricted: true
        })
      // $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('AuthInterceptor');
    }

    function runBlock($ionicPlatform, $rootScope, $location, $window) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }

        if (!$window.localStorage.getItem("token")) {
          $location.path('/login');
        }

      });
    }

    function ionicTimePickerProvider() {
      var timePickerObj = {
        inputTime: ((new Date().getHours() *60 * 60) + ((new Date()).getMinutes * 60 )),
        format: 12,
        step: 15,
        setLabel: 'Set',
        closeLabel: 'Close'
      };
      ionicTimePickerProvider.configTimePicker(timePickerObj);
    }

})();
