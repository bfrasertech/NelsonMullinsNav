const build = require('@microsoft/sp-build-web');
const fs = require('fs');

const config = build.subTask('setup-config', function(gulp, buildConfig, done){

    const env = (process.env.NODE_ENV || 'production').trim().toLowerCase();
    console.log(`env = ${env}`);
    fs.copyFileSync(`./src/config.${env}.json`, './lib/config.json');
    console.log(`env = ${env} ok`);

    return new Promise(function(resolve, reject){
        resolve();
    });

});

exports.default = config;