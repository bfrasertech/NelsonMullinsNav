const build = require('@microsoft/sp-build-web');
const fs = require('fs');

const config = build.subTask('setup-config', function(gulp, buildConfig, done){

    // default to production build when env not set
    const env = (process.env.NODE_ENV || 'production').trim().toLowerCase();
    fs.copyFileSync(`./src/config.${env}.json`, './lib/config.json');

    return new Promise(function(resolve, reject){
        resolve();
    });

});

exports.default = config;