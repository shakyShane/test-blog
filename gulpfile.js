var gulp         = require("gulp");
var crossbow     = require("crossbow");
var browserSync  = require("browser-sync");
var htmlInjector = require("bs-html-injector");

/**
 * Start BrowserSync
 */
gulp.task("serve", function () {
    browserSync.use(htmlInjector);
    browserSync({
        open: false,
        server: true
    });
});

/**
 * Default task
 */
gulp.task("crossbow", function () {
    return gulp.src([
        "_src/*.html",
        "_src/_posts/*"
    ])
    .pipe(crossbow.stream({
        config: {
            cwd: "_src",
            defaultLayout: "default.hbs",
            prettyUrls: true,
            highlight: false
        }
    }))
    .pipe(gulp.dest("./"));
});

gulp.task("watch", function () {
    gulp.watch(["_src/**"], ["crossbow", function () {
        htmlInjector();
        browserSync.notify("<span style='color: magenta'>Crossbow:</span> Injecting HTML");
    }]);
});

gulp.task("default", ["crossbow", "serve", "watch"]);