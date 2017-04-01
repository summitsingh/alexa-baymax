module.exports = function(grunt) {

    grunt.initConfig({
        jasmine_node: {
            options: {
                forceExit: true,
                matchall: true,
                extensions: 'js',
                specNameMatcher: 'spec'
            },
            all: ['test/']
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('test', ['jasmine_node']);

};