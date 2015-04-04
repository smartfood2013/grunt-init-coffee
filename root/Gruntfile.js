'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('{%= coffeejson %}'),
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
		'src/js/<%= pkg.name %>.js': ['src/**/*.coffee', '!src/hello.coffee']
	    }
	},
	compileBare: {
	    options: {
		bare: true
	    },
	    src: ['src/**/*.coffee', '!src/hello.coffee'],
            dest: 'src/js/<%= pkg.name %>.js'
	},
        compileJoined: {
	    options: {
		join: true
	    },
            files: {
		'src/js/hello.js': 'src/hello.coffee',
		'src/js/<%= pkg.name %>.js': ['src/**/*.coffee', '!src/hello.coffee']
	    }
	}
    },
    browserify: {
        standalone: {
            src: '<%= coffee.compileBare.dest %>',
            dest: 'dist/<%= pkg.name %>.bundle.js',
            options: {
                bundleOptions: {
                standalone: '<%= pkg.name %>'
            }
       }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= browserify.standalone.dest %>',
        dest: 'dist/<%= pkg.name %>.bundle.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: []
      },
      src: {
        files: 'src/**/*.coffee',
        tasks: ['qunit']
      },
      test: {
        files: 'test/**/*.coffee',
        tasks: ['qunit']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-browserify');
  // Default task.
  grunt.registerTask('default', ['qunit', 'clean', 'concat', 'uglify']);

};
