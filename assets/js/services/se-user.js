angular.module('ambrosia').service('seUser',
['$http',
function ($http)
{
  var self = this
  self.logName = 'seUser'

  /***
  For static vars and shit
  ***/

  self.user = {
    image : 'assets/img/test/test_user.png',
    name : 'Geoff Test',
    email : 'geoffrey.test@gmail.com',
    background : 7,
  }

  self.print = function (response) {
    console.log(self.logName + " response: ", response)
  }

}]);
