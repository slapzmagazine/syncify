const { resolve } = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const bundle = {
  entry: resolve(process.cwd(), 'source/js2/index.js'),
  mode: 'development',
  output: {
    path: resolve(process.cwd(), 'theme/assets'),
    filename: 'webpack-bundle.js'
  },
  infrastructureLogging: {
    // colors: true,
    // level: 'verbose'
  }
};

module.exports = bundle;