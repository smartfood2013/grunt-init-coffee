'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('{%= jqueryjson %}'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist', '**/*~']
    },
    coffee: {
	compile: {
	    files: {
		'src/js/hello.js': 'src/hello.coffee',
		'src/js/coffee/<%= pkg.name %>': ['src/**/*.coffee', '!src/hello.coffee']
	    }
	},
	compileBare: {
	    options: {
		bare: true
	    },
            files: {
		'src/js/hello.js': 'src/hello.coffee',
		'src/js/coffee/<%= pkg.name %>': ['src/**/*.coffee', '!src/hello.coffee']
	    }
	},
        compileJoined: {
	    options: {
		join: true
	    },
            files: {
		'src/js/hello.js': 'src/hello.coffee',
		'src/js/coffee/<%= pkg.name %>': ['src/**/*.coffee', '!src/hello.coffee']
	    }
	}
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/**/*.coffee'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: 'src/**/*.coffee',
        tasks: ['qunit']
      },
      test: {
        files: 'test/**/*.coffee',
        tasks: ['jshint:test', 'qunit']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task.
  grunt.registerTask('default', ['qunit', 'clean', 'concat', 'uglify']);

};
