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
       var newList = []
       list = _.map(list, function(pick){ return pick })

       while (newList.length < $scope.ctrl.size) {
            var index = chance.integer({min: 0, max: list.length - 1})
            newList.push(list[index])
            list.splice(index, 1)
       }

       list = _.sortBy( newList , function(pick){ return -pick.invested })
       console.log(list)
       $scope.ctrl.list = list
       $rootScope.loading = false
    })

}])