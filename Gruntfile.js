'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['app/**/*.js', 'public/scripts/**/*.js']
    },
    concurrent: {
      start: {
        tasks: ['watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        }
      },
      scripts: {
        files: ['public/scripts/*.js'],
        tasks: ['browserify', 'uglify'],
        options: {
          debounceDelay: 250
        }
      },
      layout: {
        files: ['public/images/*', 'public/stylesheets/*', 'app/views/*']
      }
    },
    browserify: {
      options: {
        transform: ['reactify'],
          underscore: {
            path: 'public/components/underscore/underscore.js',
            exports: '_'
          },
          backbone: {
            path: 'public/components/backbone/backbone.js',
            exports: 'Backbone',
            depends: {
              underscore: 'underscore'
            }
          },
          react: {
            path: 'public/components/react/react',
            exports: 'React'
          }
        }
      },
      files: {
        src: ['public/scripts/application.js'],
        dest: 'public/build/application.js'
      },
      sass: {
        dist: {
          files: [{
            expand: true,
            cwd: 'scss',
            src: ['*.scss'],
            dest: '../public/stylesheets',
            ext: '.css'
          }]
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/build/app.min.js': ['public/build/build.js'],
          'public/build/application.min.js': ['public/build/application.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['browserify', 'concurrent', 'sass', 'uglify']);
};
