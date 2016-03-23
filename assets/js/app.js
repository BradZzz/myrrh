/*! Angular application initialization */

var modules = [
  'ngAnimate',
  'ngMaterial',
  'ui.router',
  'angular-loading-bar',
  'ui.bootstrap',
]

var role = {
    'all' : 0,
    'user' : 1,
    'admin' : 2,
    'super' : 3,
}

var app = angular.module('ambrosia', modules)

app.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/")

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/assets/html/home/main.html",
      controller: "MainCtrl",
      //access: role['admin']
    })

  $locationProvider.html5Mode(true)
})

app.run(function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    /*if (!$rootScope.auth) {
      $location.path('/login')
    } else {
      $http({
        url: '/api/v1/user/validate',
        method: "GET",
        params: $rootScope.auth,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(res) {
        if ('access' in toState && res.data.role < toState.access) {
          flash.error = "Cannot access elevated content"
          $state.go(fromState.name)
        }
      }, function(err){
        flash.error = "Error creating user"
          console.log(res)
          $location.path('/login')
      })
    }*/
  })
});

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .backgroundPalette('grey', {
      'default': '50',
      'hue-1': '100',
      'hue-2': '100',
      'hue-3': '200'
    })
});
