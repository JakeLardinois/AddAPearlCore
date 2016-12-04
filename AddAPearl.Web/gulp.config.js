'use strict';

module.exports = function () {

    var config = {
        client: {
            all: 'src/**/*',
            sass: [
                'src/**/*.scss'
            ],
            css: [
                'app/**/*.css'
            ],
            ts: [
                'src/**/*.ts'
            ],
            html: [
                'src/**/*.html'
            ]
        }
    }

    return config;
};