'use strict';

angular.module('Panache')
    .directive('pnImage', function() {

        var canvas;

        return {
            restrict: 'A',
            scope: {
                data: '=pnImageData',
                type: '=pnImageType',
            },
            link: function(scope, element, attrs) {
                canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                // canvas.setAttributeNS('http://www.w3.org/2000/svg', 'viewBox', '0 0 100 100');
                element.append(canvas);
            },
            controller: function($scope) {
                $scope.$watch('data', imageDataWatchHandler);

                function imageDataWatchHandler(data) {
                    if (data) {
                        var _img = new Image();
                        _img.src = 'data:image/' + $scope.type + ';base64,' + data;
                        _img.onload = function() {
                            var width = _img.width;
                            var height = _img.height;
                            var image = null;
                            var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                            // g.setAttribute('http://www.w3.org/2000/svg', 'transform', 'translate(10,10)');
                            image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                            image.setAttribute('xlink:href', 'data:image/' + $scope.type + ';base64,' + data);
                            image.setAttribute('x', 0);
                            image.setAttribute('y', 0);
                            image.setAttribute('width', width + 'px');
                            image.setAttribute('height', height + 'px');
                            // g.appendChild(image);
                            canvas.appendChild(image);
                        };
                    }
                }
            }
        };

    });
