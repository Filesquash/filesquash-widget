const sass = require('@stencil/sass');

exports.config = {
  namespace: 'filesquash',
  outputTargets:[
    { type: 'dist' },
    { type: 'www' }
  ],
  plugins: [
    sass()
  ],
  globalScript: 'src/global/index.ts'
};
