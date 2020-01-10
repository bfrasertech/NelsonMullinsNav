const build = require('@microsoft/sp-build-web');
const fs = require('fs');

const config = build.subTask('setup-config', function(gulp, buildConfig, done){

    const env = (process.env.NODE_ENV || 'production').toLowerCase();
    fs.copyFileSync(`./src/config.${env}.json`, './lib/config.json');

    return new Promise(function(resolve, reject){
        if (env === 'local'){
            resolve({url: 'local urlx'});
        } else if (env === 'production'){
            resolve({url: 'production urlx'});
        } else{
            resolve({url: 'fallback urlx'});
        }
    });

});

exports.default = config;