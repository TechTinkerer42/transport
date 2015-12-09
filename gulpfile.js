// Include gulp
var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var config = require('./gulp.config')();
var tsProject = tsc.createProject('./src/tsconfig.json');
var browserSync = require('browser-sync');
var del = require('del');

var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {

});

gulp.task('html', function() {
	return gulp.src(['src/**/**.html'])
		.pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('ts-lint', function() {
	return gulp.src(config.allTs)
		.pipe(tslint())
		.pipe(tslint.report('prose'), {
			emitError: false
		});
});

gulp.task('copy-resources', ['html', 'copy-css', 'copy-libs']);

gulp.task('clean', function() {
	return del(config.tsOutputPath);
});

gulp.task('copy-libs', function() {
	return gulp.src(config.jsLibPaths)
		.pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('copy-css', function() {
	return gulp.src(['src/**/*.css'])
		.pipe(gulp.dest(config.tsOutputPath));
});

//Compile TypeScript
gulp.task('compile-ts', function() {
	var sourceTsFiles = [
	   config.allTs,
	   config.typings
     ];

	return gulp
		.src(sourceTsFiles)
		.pipe(tsc(tsProject))
		.pipe(gulp.dest(config.tsOutputPath));

	return tsResult;
});

gulp.task('build', ['ts-lint', 'compile-ts', 'copy-resources']);

gulp.task('serve', ['build'], function() {

	gulp.watch([config.allTs, '**/*.html'], ['build']);

	browserSync({
		port: 3000,
    files: ['src/index.html', '**/*.js', 'css/*'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './scripts/build'
    }
	});

});

gulp.task('default', ['serve']);
