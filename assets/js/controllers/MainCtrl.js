angular.module('ambrosia').controller('MainCtrl', function ($scope, $timeout, $mdSidenav, $log)
{
    $scope.ctrl = {
        test : [
            { ticker : 'AAPL', invested : 105, comments : [ 'yo', 'sup', 'howdy' ] },
            { ticker : 'GOOGL', invested : 95, comments : [ 'yo', 'sup', 'howdy', 'bro bro' ] },
            { ticker : 'IBM', invested : 77, comments : [ 'yo', 'sup', 'howdy', 'eeny meeny' ] },
            { ticker : 'AAPL', invested : 1, comments : [ 'yo', 'sup', 'howdy' ] },
            { ticker : 'GOOGL', invested : 2, comments : [ 'yo', 'sup', 'howdy', 'bro bro' ] },
            { ticker : 'IBM', invested : 3, comments : [ 'yo', 'sup', 'howdy', 'eeny meeny' ] },
            { ticker : 'AAPL', invested : 4, comments : [ 'yo', 'sup', 'howdy' ] },
            { ticker : 'GOOGL', invested : 5, comments : [ 'yo', 'sup', 'howdy', 'bro bro' ] },
            { ticker : 'IBM', invested : 6, comments : [ 'yo', 'sup', 'howdy', 'eeny meeny' ] },
            { ticker : 'AAPL', invested : 7, comments : [ 'yo', 'sup', 'howdy' ] },
            { ticker : 'GOOGL', invested : 8, comments : [ 'yo', 'sup', 'howdy', 'bro bro' ] },
            { ticker : 'IBM', invested : 9, comments : [ 'yo', 'sup', 'howdy', 'eeny meeny' ] },
            { ticker : 'AAPL', invested : 10, comments : [ 'yo', 'sup', 'howdy' ] },
            { ticker : 'GOOGL', invested : 11, comments : [ 'yo', 'sup', 'howdy', 'bro bro' ] },
            { ticker : 'IBM', invested : 12, comments : [ 'yo', 'sup', 'howdy', 'eeny meeny' ] },
        ],
        links : ['share', 'save', 'hide', 'report']
    }
})