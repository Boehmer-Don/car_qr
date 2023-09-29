//webpack.config.js
const path = require('path');
const {merge} = require('webpack-merge');

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};

const baseConfig = {
  entry: {
    main: './src/base.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/base.js', // <--- Will be compiled to this single file
  },
};

const userConfig = {
  entry: {
    main: './src/user.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/user.js', // <--- Will be compiled to this single file
  },
};

const customConfig = {
  entry: {
    main: './src/custom.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/custom.js', // <--- Will be compiled to this single file
  },
};

const countriesConfig = {
  entry: {
    main: './src/countries.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/countries.js', // <--- Will be compiled to this single file
  },
};

const labelConfig = {
  entry: {
    main: './src/label.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/label.js', // <--- Will be compiled to this single file
  },
};

const newLabelConfig = {
  entry: {
    main: './src/new_label.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/new_label.js', // <--- Will be compiled to this single file
  },
};

const logoUploadConfig = {
  entry: {
    main: './src/logo_upload.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/logo_upload.js', // <--- Will be compiled to this single file
  },
};

const reports = {
  entry: {
    main: './src/report.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/report.js', // <--- Will be compiled to this single file
  },
};

const usersSearchResult = {
  entry: {
    main: './src/users_search_result.ts',
  },
  output: {
    path: path.resolve(__dirname, './app/static'),
    filename: 'js/users_search_result.js', // <--- Will be compiled to this single file
  },
};

const configs = [
  baseConfig,
  userConfig,
  customConfig,
  logoUploadConfig,
  labelConfig,
  newLabelConfig,
  reports,
  countriesConfig,
  usersSearchResult,
].map(conf => merge(defaultConfig, conf));

module.exports = configs;
