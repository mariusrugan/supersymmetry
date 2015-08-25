var config = require('./')

module.exports = {
    open: false,
    server: {
        baseDir: config.publicDirectory,
        routes: {
            "/bower_components": "bower_components"
        },
        middleware: [
            /*
            function (req, res, next) {
                console.log("Hi from first middleware", req.originalUrl);
                next();
            },
            function (req, res, next) {
                console.log("Hi from the second middleware");
                next();
            }
            */
        ]
    },
    files: ['public/**/*.html']
}
