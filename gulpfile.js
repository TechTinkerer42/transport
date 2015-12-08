// Include gulp
var gulp = require('gulp'); 
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var config = require('./gulp.config')();
var tsProject = tsc.createProject('./src/tsconfig.json');

var sourcemaps = require('gulp-sourcemaps');

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
