'use strict';

angular.module('Panache')
    .directive('pnImage', function() {

        var svg, g, image;

        return {
            restrict: 'A',
            scope: {
                data: '=pnImageData',
                type: '=pnImageType',
            },
            templateUrl: 'views/image.html',
            link: function(scope, element, attrs) {
                svg = element.find('svg');
                g = svg.find('g');
                image = g.find('image');
            },
            controller: function($scope) {
                $scope.$watch('data', imageDataWatchHandler);

                function imageDataWatchHandler(data) {
                    if (data) {
                        var _img = new Image();
                        _img.src = 'data:image/jpeg;base64,' + data;
                        var width = _img.width;
                        var height = _img.height;
                        _img = null;
                        var widthRatio = 1000 / width,
                            heightRatio = 1000 / height,
                            ratio = Math.min(widthRatio, heightRatio);
                        var xoffset = (1000 - width * ratio) / 2,
                            yoffset = (1000 - height * ratio) / 2;
                        g.attr({
                            'transform': 'translate(' + xoffset + ' ' + yoffset + ')'
                        });
                        image.attr({
                            'x': 0,
                            'y': 0,
                            'width': width * ratio,
                            'height': height * ratio,
                            'xlink:href': 'data:image/jpeg;base64,' + data
                        });
                        svg.html(svg.html());
                    }
                }
            }
        };

    });
