// Include gulp
var gulp = require('gulp'); 
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var config = require('./gulp.config')();
var tsProject = tsc.createProject('./src/tsconfig.json');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var superstatic = require('superstatic');

var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
	
});

gulp.task('ts-lint', function() {
	return gulp.src(config.allTs)
		.pipe(tslint())
		.pipe(tslint.report('prose'), {
			emitError: false
		});
});

//Compile TypeScript
gulp.task('compile-ts', function() {
	var sourceTsFiles = [
	   config.allTs,
	   config.typings
     ];
	
	var tsResult = gulp
		.src(sourceTsFiles)
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));
	
	return tsResult.js
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('serve', ['ts-lint', 'compile-ts'], function() {
	
	gulp.watch([config.allTs], ['ts-lint', 'compile-ts']);
	
	browserSync({
		port: 3000,
    files: ['index.html', '**/*.js', 'css/*'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',    
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './src'
    }
	});
	
});

gulp.task('default', ['serve']);
