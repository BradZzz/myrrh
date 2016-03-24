angular.module('ambrosia').controller('StockCtrl', function ($scope, $rootScope, $state, $stateParams, $location, $window, seQuotes)
{

    $rootScope.loading = true;

    $scope.ctrl = {
        period : 'd',
        actions : {
            commentEx : false,
            commentIcon : function (expanded) {
                return expanded ? 'ion-chevron-down' : 'ion-chevron-up'
            },
            commentUserBase : 'assets/img/test/',
            commentUsers : [
                'test_other_01.png',
                'test_other_02.png',
                'test_other_03.png',
                'test_other_04.png',
                'test_other_05.png',
                'test_other_06.png',
                'test_other_07.png',
                'test_other_08.png',
                'test_other_09.png',
                'test_other_10.png',
            ],
        },
        company : {},
        data : [],
    }

    if ('ticker' in $stateParams) {

        $scope.ctrl.tickerAbbrv = $stateParams.ticker

        seQuotes.getCompany($scope.ctrl.tickerAbbrv).then(function(company){
           $scope.ctrl.company = {
            name : company.name,
            abbr : company.symbol,
            stockDetails : [
                { key : 'Ask', value : company.ask },
                { key : 'Day Low', value : company.daysLow },
                { key : 'Day High', value : company.daysHigh }
            ],
           }
           seQuotes.getTestList().then(function(list){
              console.log('finished')
              console.log(list)
              var companyList = list[$scope.ctrl.tickerAbbrv]
              console.log(companyList)
              /*
                                  comments.push({
                                      user: chance.word({syllables: chance.integer({min: 1, max: 10})}),
                                      text: chance.paragraph({sentences: chance.integer({min: 1, max: 3})})
                                  })
              */
              $scope.ctrl.company.comments = _.map(companyList.comments,
                function(comment){ return {
                    photo: $scope.ctrl.actions.commentUserBase + $scope.ctrl.actions.commentUsers[chance.integer({ min: 0, max: companyList.comments.length - 1 })],
                    user: comment.user,
                    text: comment.text,
                }
              })
              var invested = companyList.invested
              var transaction = companyList.buyFee
              var adj = (parseFloat(transaction) / parseFloat(invested)).toFixed(2)
              $scope.ctrl.company.stockUserDetails = [
                { key : 'Users Invested:', value : invested },
                { key : 'Transaction Price:', value : "$" + transaction },
                { key : 'Adj. Transaction Price:', value : "$" + adj }
              ]
              checkLoaded()
           })
        })

        seQuotes.getOne($scope.ctrl.tickerAbbrv, $scope.ctrl.period).then(function(response){
            $scope.ctrl.data = response
            console.log(seQuotes.convertHighcharts($scope.ctrl.data))

            $('#container').highcharts('StockChart', {
                exporting: { enabled: false },
                chart: { type: 'columnrange', backgroundColor: null },
                rangeSelector: { selected: 2 },
                yAxis: { labels : { enabled : false }},
                title: { text: '' },
                tooltip: { valuePrefix: '$' },
                series: [{ name: 'Prices', data: seQuotes.convertHighcharts($scope.ctrl.data) }]
            });
            checkLoaded()
        })
    }

    function checkLoaded() {
        if ('stockUserDetails' in $scope.ctrl.company && 'data' in $scope.ctrl && $scope.ctrl.data.length > 0 && $scope.ctrl.company.stockUserDetails.length > 0) {
            $rootScope.loading = false
        }
    }
})