const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mixins = require('postcss-mixins');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const webpack = require('gulp-webpack');
const babel = require('gulp-babel')

//Nodemon
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

/////////////////////////////////

gulp.task('serve', ['sass', 'compilejs', 'nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: [{
					match: ["views/**/*.handlebars", "/**/*.js", "public/js/modules/*.js", "public/styles/scss/*.css"],
					fn: function(event, file) {
						this.reload()
					}}],
        browser: "chrome",
				port: 7000}
			);

	gulp.watch("public/styles/scss/*.css", ['sass']);
	gulp.watch("public/js/modules/*.js", ['compilejs']);
	gulp.watch("views/**/*.handlebars").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(['public/styles/scss/*.css', '!_*'])
			.pipe(postcss([cssImport, mixins, nested, cssvars, autoprefixer]))
			.on('error', function(errorInfo) {
				console.log(errorInfo.toString());
				this.emit('end');
			})
			.pipe(gulp.dest("public/styles/css"))
			.pipe(browserSync.stream());
});

// Webpack & Babel
gulp.task('compilejs', function() {
	return gulp.src('public/js/script.js')
		.pipe(webpack({
			output: {
				filename: 'main.js'
			},
			module: {
				loaders: [
					{
						loader: 'babel-loader',
						query: {
							presets: ['es2015']
						},
						test: /\.js$/,
						exclude: /node_modules/
					}
				]
			}
		}))
		.pipe(gulp.dest('public/js/dist'))
		// .pipe(browserSync.stream());
})

gulp.task('default', ['serve']);