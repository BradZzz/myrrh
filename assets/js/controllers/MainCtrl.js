angular.module('ambrosia').controller('MainCtrl', ['$scope', '$rootScope', 'seQuotes',
 function ($scope, $rootScope, seQuotes)
{
    $rootScope.loading = true;

    $scope.ctrl = {
        size : 50,
        list : {},
        links : ['share', 'save', 'hide', 'report']
    }

    seQuotes.getTestList().then(function(list){
       console.log('finished')
       list = _.sortBy(_.map(list, function(pick){ return pick }), function(pick){ return -pick.invested }).splice(0,50)
       console.log(list)
       $scope.ctrl.list = list
       $rootScope.loading = false
    })

}])