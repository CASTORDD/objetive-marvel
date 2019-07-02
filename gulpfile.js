const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', gulp.series(() => {
	return gulp.src([
		'src/scss/*.scss'
	])
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
}));

gulp.task('font-awesome', gulp.series(() => {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest('src/css'));
}));

gulp.task('fonts', gulp.series(() => {
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest('src/fonts'));
}));

gulp.task('serve', gulp.series(['sass'], () => {
	browserSync.init({
		server: './src'
	});

	gulp.watch([
		'src/scss/*.scss',
		'src/scss/components/*.scss'
	], gulp.parallel(['sass']));

	gulp.watch('src/*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series(['font-awesome', 'fonts', 'serve',]));