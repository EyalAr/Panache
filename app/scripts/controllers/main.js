'use strict';

angular.module('Panache')
    .controller('mainCtrl', function($scope) {

        var exts = ['.jpg', '.jpeg', '.png', '.gif'];

        $scope.current = {
            dir: process.cwd(),
            images: [],
            selected: [],
            image: null
        };

        $scope.zoom = {
            type: 'fixed',
            value: 'real'
        };

        $scope.$watch('current.dir', currentDirWatchHandler);

        function currentDirWatchHandler(dirPath) {
            if (dirPath) {
                var fs = require('fs'),
                    path = require('path');
                fs.readdir(dirPath, function(err, list) {
                    if (err) {
                        // TODO: handle error
                        return $scope.current.images = [];
                    }
                    $scope.current.images = list.filter(function(i) {
                        return exts.indexOf(path.extname(i).toLowerCase()) !== -1;
                    });
                });
            }
        }

    });
