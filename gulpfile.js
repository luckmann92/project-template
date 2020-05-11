const gulp = require( 'gulp' );
const changed = require( 'gulp-changed' );
const gulpClean = require( 'gulp-clean' );
const rename = require( 'gulp-rename' );
const size = require( 'gulp-size' );
const gulpIf = require( 'gulp-if' );
const liveReload = require( 'gulp-livereload' );
const fileInclude = require( 'gulp-file-include' );
const htmlClassPrefix = require( 'gulp-html-prefix' );
const sass = require( 'gulp-sass' );
sass.compiler = require( 'node-sass' );
const tildeImporter = require( 'node-sass-tilde-importer' );
const autoPrefixer = require( 'gulp-autoprefixer' );
const gulpStyleLint = require( 'gulp-stylelint' );
const cssClassPrefix = require( 'gulp-class-prefix' );
const cleanCss = require( 'gulp-clean-css' );
const webpack = require( 'webpack' );
const webpackStream = require( 'webpack-stream' );
const imageMin = require( 'gulp-imagemin' );
const svgSprite = require( 'gulp-svg-sprite' );
const gulpJsonServer = require( 'gulp-json-srv' );
const jsonServerConfig = require( './server.config' );
const jsonServer = gulpJsonServer.create( jsonServerConfig );

const path = {
    build: {
        base: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img',
        fonts: 'build/fonts',
        svg: 'build/img/svg',
    },
    src: {
        html: 'src/html/*.html',
        js: 'src/js/main.js',
        scss: {
            all: 'src/scss/**/*.scss',
            main: 'src/scss/main.scss',
            vendors: 'src/scss/vendors/index.scss',
        },
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        svg: 'src/svg/*.svg',
        db: 'db.json',
    },
    watch: {
        html: 'src/html/**/*.html',
        js: 'src/js/**/*.js',
        scss: {
            main: [ 'src/scss/**/*.scss', '!src/scss/vendors/**/*.scss' ],
            vendors: 'src/scss/vendors/**/*.scss',
        },
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        svg: 'src/svg/*.svg',
        db: 'db.json',
    },
};

const config = {
    env: process.env.NODE_ENV || 'development',
    styleClassPrefix: '',
};
const isProdEnv = config.env === 'production';

function styleLint() {
    return gulp.src( path.src.scss.all )
               .pipe( gulpStyleLint(
                   {
                       failAfterError: true,
                       reporters: [
                           { formatter: 'string', console: true },
                       ],
                       debug: true,
                   } ) );
}

function html() {
    return gulp.src( path.src.html )
               .pipe( fileInclude( { basepath: './src/html' } ) )
               .pipe( htmlClassPrefix( config.styleClassPrefix ) )
               .pipe( gulp.dest( path.build.base ) )
               .pipe( liveReload() );
}

function scss() {
    return gulp.src( path.src.scss.main )
               .pipe( sass(
                   {
                       importer: tildeImporter,
                       includePaths: [ 'node_modules' ],
                       indentWidth: 4,
                   } ) )
               .pipe( autoPrefixer() )
               .pipe( cssClassPrefix( config.styleClassPrefix ) )
               .pipe( gulpIf( isProdEnv, cleanCss() ) )
               .pipe( rename( { basename: 'legacy-main' } ) )
               .pipe( size( { showFiles: true } ) )
               .pipe( gulp.dest( path.build.css ) )
               .pipe( liveReload() );
}

function scssVendors() {
    return gulp.src( path.src.scss.vendors )
               .pipe( sass( {
                   importer: tildeImporter,
                   includePaths: [ 'node_modules' ],
               } ) )
               .pipe( autoPrefixer() )
               .pipe( cssClassPrefix( config.styleClassPrefix ) )
               .pipe( gulpIf( isProdEnv, cleanCss() ) )
               .pipe( rename( { basename: 'legacy-vendors' } ) )
               .pipe( size( { showFiles: true } ) )
               .pipe( gulp.dest( path.build.css ) )
               .pipe( liveReload() );
}

function js() {
    const config = require( './webpack.config' );

    return gulp.src( path.src.js )
               .pipe( webpackStream( config, webpack ) )
               .on( 'error', function( error ) {
                   console.log( error );
               } )
               .pipe( gulp.dest( './' + path.build.js ) )
               .pipe( liveReload() );
}

function img() {
    return gulp.src( path.src.img )
               .pipe( changed( path.build.img ) )
               .pipe( imageMin(
                   {
                       progressive: true,
                       interlaced: true,
                   } ) )
               .pipe( gulp.dest( path.build.img ) )
               .pipe( liveReload() );
}

function svg() {
    const config = {
        shape: {
            dimension: {
                maxWidth: 30,
                maxHeight: 30,
                attributes: false,
            },
            spacing: {
                padding: 0,
            },
            transform: [ 'svgo' ],
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false,
        },
        mode: {
            css: false,
            view: false,
            defs: false,
            stack: false,
            symbol: {
                dest: 'svg',
                sprite: 'sprite.svg',
                bust: false,
                example: true,
            },
        },
    };

    return gulp.src( path.src.svg )
               .pipe( svgSprite( config ) )
               .pipe( gulp.dest( path.build.img ) )
               .pipe( liveReload() );
}

function fonts() {
    return gulp.src( path.src.fonts )
               .pipe( gulp.dest( path.build.fonts ) );
}

function server() {
    return gulp.src( path.src.db )
               .pipe( jsonServer.pipe() )
               .pipe( liveReload() )
               .on( 'end', function() {
                   console.log( 'Server start - http://localhost:3000' );
               } );
}

function watch() {
    liveReload.listen();
    gulp.watch( path.watch.html, html );
    gulp.watch( path.watch.svg, gulp.series( svg, html ) );
    gulp.watch( path.watch.scss.main, gulp.series( styleLint, scss ) );
    gulp.watch( path.watch.scss.vendors, gulp.series( styleLint, scssVendors ) );
    gulp.watch( path.watch.js, js );
    gulp.watch( path.watch.img, img );
    gulp.watch( path.watch.db, server );
}

function clean() {
    return gulp.src( path.build.base, { allowEmpty: true } )
               .pipe( gulpClean() );
}

function build() {
    return gulp.series(
        clean,
        gulp.parallel(
            gulp.series( styleLint, scss, scssVendors ),
            js, img, fonts,
            gulp.series( svg, html ),
        ),
    );
}

function run() {
    return gulp.parallel( watch, server );
}

function start() {
    return gulp.series(
        build(),
        run(),
    );
}

exports.html = gulp.series( svg, html );
exports.scss = gulp.series( styleLint, scss );
exports['scss-vendors'] = gulp.series( styleLint, scssVendors );
exports.js = js;
exports.img = img;
exports.svg = svg;
exports.fonts = fonts;
exports.server = server;
exports.clean = clean;
exports.build = build();
exports.run = run();
exports.start = start();
