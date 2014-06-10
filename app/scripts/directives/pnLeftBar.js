'use strict';

angular.module('Panache')
    .directive('pnLeftBar', function() {

        var path = require('path'),
            fs = require('fs');

        function getParents(prev, dirPath) {
            var parent = path.dirname(dirPath),
                basename = path.basename(parent);
            if (!basename) {
                return prev;
            }
            prev.unshift({
                name: basename,
                path: parent,
            });
            return getParents(prev, parent);
        }

        function getChildren(dirPath, done) {
            fs.readdir(dirPath, function(err, list) {
                if (err) {
                    return done(err);
                }
                async.filter(list.map(function(item) {
                    return {
                        name: item,
                        path: path.join(dirPath, item)
                    };
                }), function(item, done) {
                    fs.stat(item.path, function(err, stats) {
                        done(!err && stats.isDirectory());
                    });
                }, function(results) {
                    done(null, results);
                });
            });
        }

        return {
            restrict: 'A',
            templateUrl: 'views/leftBar.html',
            scope: {
                current: '=pnCurrent',
            },
            controller: function($scope) {
                $scope.tree = [];
                $scope.$watch('current.dir', currentDirWatchHandler);
                $scope.select = function(dirPath) {
                    $scope.current.dir = dirPath;
                }

                function currentDirWatchHandler(dir) {
                    if (dir) {
                        var tree = getParents([], dir);
                        tree.unshift({
                            path: '/',
                            name: '/'
                        });
                        var directParent = tree[tree.length - 1];
                        async.series([

                            function(next) {
                                getChildren(directParent.path, function(err, children) {
                                    if (err) {
                                        return next(err);
                                    }
                                    directParent.children = children;
                                    directParent.open = true;
                                    next();
                                });
                            },

                            function(next) {
                                if (directParent.path !== $scope.current.dir) {
                                    for (var i = 0; directParent.children[i].path !== $scope.current.dir; i++);
                                    var currentSibling = directParent.children[i];
                                    currentSibling.open = true;
                                    getChildren(currentSibling.path, function(err, children) {
                                        if (err) {
                                            return next(err);
                                        }
                                        currentSibling.children = children;
                                        next();
                                    });
                                } else next();
                            }

                        ], function(err) {
                            if (err) {
                                // TODO: handle error
                                return console.error(err);
                            }
                            $scope.$apply(function() {
                                angular.copy(tree, $scope.tree);
                            });
                        });
                    }
                }
            }
        };

    });
