'use strict';

angular.module('Panache')
    .directive('pnImage', function() {

        var svg, g, image;

        return {
            restrict: 'A',
            scope: {
                image: '=pnImageParams',
                zoom: '=pnZoom'
            },
            templateUrl: 'views/image.html',
            link: function(scope, element, attrs) {
                svg = element.find('svg');
                g = svg.find('g');
                image = g.find('image');
            },
            controller: function($scope) {
                $scope.$watch('image', imageDataWatchHandler, true);

                function imageDataWatchHandler(imData) {
                    if (imData) {
                        // set image data
                        image.attr({
                            'xlink:href': 'data:image/' + imData.type + ';base64,' + imData.data,
                            'preserveAspectRatio': 'none'
                        });
                        // get image dimensions:
                        var _img = new Image();
                        _img.src = 'data:image/' + imData.type + ';base64,' + imData.data;
                        var width = +_img.width,
                            height = +_img.height;
                        _img = null; // dispose
                        fixDisplay($scope.zoom, width, height);
                    }
                }

                function fixDisplay(zoom, imWidth, imHeight) {
                    if (zoom && zoom.type === 'fixed' && zoom.value === 'fit') {
                        _fitRatio();
                    } else if (zoom && zoom.type === 'fixed' && zoom.value === 'real') {
                        _real();
                    } else { // default
                        _real();
                    }

                    // update view
                    svg.html(svg.html());

                    // fit image to view and keep aspect ratio
                    function _fitRatio() {
                        var widthRatio = 100000 / imWidth,
                            heightRatio = 100000 / imHeight,
                            ratio = Math.min(widthRatio, heightRatio);
                        var xoffset = (100000 - imWidth * ratio) / 2,
                            yoffset = (100000 - imHeight * ratio) / 2;
                        g.attr({
                            'transform': 'translate(' + xoffset + ' ' + yoffset + ')'
                        });
                        image.attr({
                            'x': 0,
                            'y': 0,
                            'width': imWidth * ratio,
                            'height': imHeight * ratio
                        });
                    }

                    // display in real size
                    function _real() {
                        var svgWidth = +svg.width(),
                            svgHeight = +svg.height();
                        var widthRatio = 100000 / svgWidth,
                            heightRatio = 100000 / svgHeight;
                        console.log(svgWidth, svgHeight, imWidth, imHeight, widthRatio, heightRatio);
                        console.log(imWidth * widthRatio, imHeight * heightRatio);
                        var xoffset = (100000 - imWidth * widthRatio) / 2,
                            yoffset = (100000 - imHeight * heightRatio) / 2;
                        g.attr({
                            'transform': 'translate(' + xoffset + ' ' + yoffset + ')'
                        });
                        image.attr({
                            'x': 0,
                            'y': 0,
                            'width': imWidth * widthRatio,
                            'height': imHeight * heightRatio
                        });
                    }

                }

            }
        };

    });
