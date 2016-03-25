angular.module('ambrosia').controller('HeaderCtrl', function ($scope, $state, $timeout, $mdSidenav, $log, seQuotes)
{

  $scope.ctrl = {
    simulateQuery : false,
    isDisabled : false,
    states : [],
    querySearch : function (query) {
        if (query) {
            return _.filter($scope.ctrl.states, function(tick){ return tick.value.substring(0, query.length) == query }).splice(0, 15)
        } else {
            return []
        }
    },
    selectedItemChange : function (item) {
        if ('value' in item) {
          $state.go('stock', { ticker: item.value.toUpperCase() })
        }
    },
    searchTextChange : function (text) {
      console.log('Text changed to ' + text);
    },
    newState : function (state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    },
    test : {
        image : 'assets/img/test/test_user.png',
        name : 'Geoff Test',
        email : 'geoffrey.test@gmail.com',
        background : 4,
    },
    nav : [
        { icon : 'ion-android-home', text : 'Home', click : function(){console.log("clicked home")} },
        { icon : 'ion-folder', text : 'Profile', click : function(){console.log("clicked profile")} },
        { icon : 'ion-ios-pulse-strong', text : 'Analytics', click : function(){console.log("clicked analytics")} },
        { icon : 'ion-ios-gear', text : 'Settings', click : function(){console.log("clicked settings")} },
        { icon : 'ion-android-exit', text : 'Logout', click : function(){console.log("clicked logout")} },
    ],
    incBackground : function (offset) {
        if (this.test.background + offset > this.backgrounds.length - 1 ) {
            this.test.background = 0
        } else if (this.test.background + offset < 0 ) {
            this.test.background = this.backgrounds.length - 1
        } else {
            this.test.background += offset
        }
    },
    backgrounds : ['assets/img/backgrounds/wall_1.png','assets/img/backgrounds/wall_2.png',
        'assets/img/backgrounds/wall_3.png','assets/img/backgrounds/wall_4.png','assets/img/backgrounds/wall_5.png',
        'assets/img/backgrounds/wall_6.png','assets/img/backgrounds/wall_7.png','assets/img/backgrounds/wall_8.png',
        'assets/img/backgrounds/wall_9.png','assets/img/backgrounds/wall_10.png','assets/img/backgrounds/wall_11.png']
  }

  seQuotes.getTestList().then(function(response){
      var tickers = _.map(response, function(num, key){ return key })
      console.log(tickers.length)

      $scope.ctrl.states = _.map( _.sortBy( tickers, function( tick ){ return tick }) , function (tick) {
         return {
           value: tick.toLowerCase(),
           display: tick
         }
      })

      console.log(tickers.length)
  })

  $scope.toggleRight = buildToggler('left')

  $scope.isOpenRight = function(){
    return $mdSidenav('left').isOpen()
  }
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
}).controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close left is done");
        });
    };
});