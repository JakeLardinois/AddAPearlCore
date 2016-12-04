module.exports = {
    port: 8000,
    injectChanges: false,
    files: ['build/**/*.{html,htm,css,js}'],
    watchOptions: {
        ignored: 'node_modules'
    },
    server: {
        baseDir: [
            "build"
        ]
    }
};