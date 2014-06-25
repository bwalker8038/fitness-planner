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
        files: ['source/scripts/*.js'],
        tasks: ['browserify', 'uglify', 'jade', 'sass'],
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
        shim: {
          jquery: {
            path: 'source/scripts/vendor/jquery/dist/jquery.js',
            exports: '$'
          },
          underscore: {
            path: 'source/scripts/vendor/underscore/underscore.js',
            exports: '_'
          },
          backbone: {
            path: 'source/scripts/vendor/backbone/backbone.js',
            exports: 'Backbone',
            depends: {
              underscore: 'underscore'
            }
          },
          react: {
            path: 'source/scripts/vendor/react/react',
            exports: 'React'
          }
        }
      },
      files: {
        src: ['source/scripts/application.js'],
        dest: 'public/build/application.js'
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'source/scss',
          src: ['*.scss'],
          dest: '../public/stylesheets',
          ext: '.css'
        }]
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "public/index.html": "source/index.jade"
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/build/app.min.js': ['public/build/application.js']
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
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('default', ['browserify', 'concurrent', 'sass', 'uglify', 'jade']);
};
