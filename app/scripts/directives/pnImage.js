'use strict';

angular.module('Panache')
    .directive('pnImage', function() {

        var svg, g, image, width, height;

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
                $scope.$watchCollection('image', imageDataWatchHandler);

                function imageDataWatchHandler(imData) {
                    if (imData) {
                        console.log(imData.data);
                        // set image data
                        image.attr({
                            'xlink:href': null
                        });
                        image.attr({
                            'xlink:href': 'data:image/' + imData.type + ';base64,' + imData.data,
                            'preserveAspectRatio': 'none'
                        });
                        // get image dimensions:
                        var _img = new Image();
                        _img.src = 'data:image/' + imData.type + ';base64,' + imData.data;
                        width = +_img.width;
                        height = +_img.height;
                        _img = null; // dispose
                        fixDisplay();
                    }
                }

                function fixDisplay() {
                    var zoom = $scope.zoom;
                    if (zoom && zoom.type === 'fixed' && zoom.value === 'fit') {
                        _fitRatio();
                    } else if (zoom && zoom.type === 'fixed' && zoom.value === 'real') {
                        _real();
                    } else { // default
                        _fit();
                    }

                    // update view
                    svg.html(svg.html());

                    // fit image to view and keep aspect ratio
                    function _fitRatio() {
                        var svgWidth = +svg.width(),
                            svgHeight = +svg.height();
                        if (svgWidth > svgHeight) {
                            if (width > height) {
                                var _width = 100000,
                                    _height = 100000 * (height / width) * (svgWidth / svgHeight);
                            } else {
                                var _height = 100000,
                                    _width = 100000 * (width / height) * (svgHeight / svgWidth);
                            }
                        } else {
                            if (width > height) {
                                var _width = 100000,
                                    _height = 100000 * (height / width) * (svgWidth / svgHeight);
                            } else {
                                var _width = 100000,
                                    _height = 100000 * (height / width) * (svgWidth / svgHeight);
                            }
                        }
                        var xoffset = (100000 - _width) / 2,
                            yoffset = (100000 - _height) / 2;
                        g.attr({
                            'transform': 'translate(' + xoffset + ' ' + yoffset + ')'
                        });
                        image.attr({
                            'x': 0,
                            'y': 0,
                            'width': _width,
                            'height': _height
                        });
                    }

                    // display in real size
                    function _real() {
                        var svgWidth = +svg.width(),
                            svgHeight = +svg.height();
                        var widthRatio = 100000 / svgWidth,
                            heightRatio = 100000 / svgHeight;
                        var xoffset = (100000 - width * widthRatio) / 2,
                            yoffset = (100000 - height * heightRatio) / 2;
                        g.attr({
                            'transform': 'translate(' + xoffset + ' ' + yoffset + ')'
                        });
                        image.attr({
                            'x': 0,
                            'y': 0,
                            'width': width * widthRatio,
                            'height': height * heightRatio
                        });
                    }

                }

            }
        };

    });
