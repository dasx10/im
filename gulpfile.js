const gulp = require('gulp');

const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");

const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssmin = require('gulp-cssmin');

const htmlmin = require('gulp-htmlmin');
const handlebars = require('gulp-compile-handlebars');
// const imagemin = require ('gulp-imagemin');
// const del = require('del');
// const webp = require('gulp-webp');
// const child_process = require('child_process');



let path = {
    src:{
        css:        './src/style/main.less',
        img:        './src/image/**/*.{png,jpg,svg,webp}',
        html:       './src/html/*.hbs',
        page:       './src/page/*.hbs',
        components: './src/components/*.hbs'
    },
    build:'./public'
}

browserSync.init({
    server: path.build
});

function css(){
    return gulp.src(path.src.css)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(cssmin())
    .pipe(gulp.dest(path.build))
    .pipe(browserSync.stream())
}

function html(){
    return gulp
    .src(path.src.html)
    .pipe(handlebars({}, {
        batch : ['./src/components', './src/page']
    }))
    .pipe(rename(function (path) {
        path.extname = ".html";
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build))

    .pipe(browserSync.stream())
}

function page () {
    return gulp
    .src(path.src.page)
    .pipe(handlebars({}, {
        batch : ['./src/components']
    }))
    .pipe(rename(function (path) {
        path.extname = ".html";
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build + '/page'))

    .pipe(browserSync.stream())
}

// function img(){
//     setTimeout(()=>{
//         child_process.exec('rm ./assets/image/*.*');
//     },10000);
//     return gulp.src(path.src.img)
//     .pipe(webp({
//         quality:70
//     }))
//     .pipe(gulp.dest(path.build))
//     .pipe(gulp.src(path.src.img))
//     .pipe(imagemin({
//         progressive:true,
//         svgoPlugins:[{removeViewBox:false}],
//         interlaced:true,
//         optimizationLevel:3
//     }))
//     .pipe(gulp.dest(path.build))
// }

function watch(){
    // gulp.watch([path.src.img],img);
    gulp.watch([path.src.page, path.src.components], page);
    gulp.watch([path.src.html, path.src.page, path.src.components], html);
    gulp.watch(['./src/style/*.less'], css);
}



// module.exports.css=css;
// module.exports.img=img;
module.exports.watch=watch;