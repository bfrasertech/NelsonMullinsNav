## nmrs-nav-extension

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

### Environment Builds in windows
You can choose to build for dev or production. This is important because each environment has a different
handshake server url.
see config.gulp.js and src/config/config.dev, config.production, config.local
```windows powershell
$env:NODE_ENV="production" // or $env:NODE_ENV="dev"
gulp bundle --ship
gulp package-solution --ship
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
