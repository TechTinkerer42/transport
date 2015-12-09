module.exports = function() {
	var config = {
		allTs: './src/**/**.ts',
		typings: './typings/**/*.d.ts',
		tsOutputPath: 'scripts/build/',
		jsLibPaths: [
			'node_modules/angular2/bundles/angular2.dev.js',
			'node_modules/systemjs/dist/system.src.js',
			'src/**/**.js'
		]
	};
	return config;
};