'use strict';

angular.module('Panache')
    .controller('welcomeCtrl', function($scope) {

        $scope.files = [];

        var fs = require('fs');
        fs.readdir('./',function(err,files){
            $scope.$apply(function(){
                angular.copy(files,$scope.files);
            });
        });

    });
