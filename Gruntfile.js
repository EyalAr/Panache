'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        paths: {
            root: 'app',
            styles: '<%= paths.root %>/styles',
            scripts: '<%= paths.root %>/scripts',
            images: '<%= paths.root %>/images',
            fonts: '<%= paths.root %>/fonts',
            bsFonts: '<%= paths.root %>/vendor/bootstrap/dist/fonts',
        },

        copy: {
            bsFonts: {
                expand: true,
                cwd: '<%= paths.bsFonts %>/',
                src: '*',
                dest: '<%= paths.fonts %>/',
                filter: 'isFile'
            }
        },

        jshint: {
            app: '<%= paths.scripts %>/**/*.js',
            test: [],
            options: {
                jshintrc: true
            }
        },

        less: {
            dev: {
                files: {
                    "<%= paths.styles %>/global.css": "<%= paths.styles %>/global.less",
                    "<%= paths.styles %>/main.css": "<%= paths.styles %>/main.less",
                    "<%= paths.styles %>/_vars.css": "<%= paths.styles %>/vars.less", // not needed for html
                },
                options: {
                    compress: false,
                    cleancss: false
                }
            }
        },

        watch: {
            files: ['<%= paths.styles %>/*.less'],
            tasks: ['less:dev'],
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'less:dev']);

};
