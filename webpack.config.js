const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

const isEnvProduction = (process.env.NODE_ENV === 'production');
const isEnvDevelopment = (process.env.NODE_ENV === 'development');
const generateSourceMap = (isEnvDevelopment || process.env.GENERATE_SOURCE_MAPS);

const webpackConfig = {
  mode: (isEnvProduction) ? 'production' : 'development',
  bail: true,
  devtool: (generateSourceMap) ? 'inline-source-map' : false,

  entry: `${path.resolve(__dirname)}/src/index.jsx`,
  devServer: {
    open: true,
    historyApiFallback: true,
  },
  output: {
    path: `${path.resolve(__dirname)}/dist`,
    pathinfo: false,
    filename: '[name].bundle.js',
    publicPath: '/',
    globalObject: 'this',
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: (generateSourceMap)
            ? {
              inline: false,
              annotation: true,
            }
            : false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    splitChunks: {
      // chunks: 'all',
      // cacheGroups: {
      //   defaultVendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: (module, chunks) => {
      //       const allChunksNames = chunks.map((chunk) => chunk.name).join('~');
      //       const prefix = 'vendors';
      //       return `${prefix}~${allChunksNames}`;
      //     },
      //   },
      // },
    },
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' },
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              limit: 10000,
            },
          },
        ],
      },

      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        options: {
          sourceType: 'unambiguous',
        },
      },

      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: generateSourceMap,
              esModule: false,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                config: true,
                parser: 'postcss',
              },
              sourceMap: generateSourceMap,
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: generateSourceMap,
              modules: {},
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: generateSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /\.module\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: generateSourceMap,
              esModule: false,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: generateSourceMap,
            },
          },
          {
            loader: require.resolve('resolve-url-loader'),
            options: {
              sourceMap: generateSourceMap,
              root: `${path.resolve(__dirname)}/src`,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: generateSourceMap,
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 3,
              modules: true,
              esModule: false,
              sourceMap: generateSourceMap,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                config: true,
                parser: 'postcss',
              },
              sourceMap: generateSourceMap,
              implementation: require.resolve('postcss'),
            },
          },
          {
            loader: require.resolve('resolve-url-loader'),
            options: {
              sourceMap: generateSourceMap,
              root: `${path.resolve(__dirname)}/src`,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: generateSourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/favicon', to: 'favicon' },
        { from: 'public/images', to: 'images' },
      ],
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.NODE_MOCK_BE': JSON.stringify(process.env.NODE_MOCK_BE),
    }),
    new RetryChunkLoadPlugin({ // NOTE: for more info on the options, see: https://github.com/mattlewis92/webpack-retry-chunk-load-plugin
      maxRetries: 4,
    }),
    // new WebpackManifestPlugin({
    // 	fileName: 'asset-manifest.json',
    // 	publicPath: `${path.resolve(__dirname)}/build/react/`,
    // 	generate: (seed, files, entrypoints) => {
    // 		const manifestFiles = files.reduce((manifest, file) => {
    // 			manifest[file.name] = file.path; // eslint-disable-line no-param-reassign
    // 			return manifest;
    // 		}, seed);
    // 		const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));
    // 		return {
    // 			files: manifestFiles,
    // 			entrypoints: entrypointFiles,
    // 		};
    // 	},
    // }),
    new MiniCssExtractPlugin({
      // filename: (pathData) => ((pathData.chunk.name === 'main')
      // 	? `static/css/[name].${process.env.npm_package_version}.chunk.css`
      // 	: `static/css/paymentcomponent.${process.env.npm_package_version}.css`),
      // chunkFilename: () => `static/css/[name].${process.env.npm_package_version}.chunk.css`,
    }),
  ],
  resolve: {
    fallback: {
      util: require.resolve('util'),
    },
    alias: {},
    modules: [
      'node_modules',
      `${path.resolve(__dirname)}/node_modules`,
    ],
    extensions: [
      '.web.mjs',
      '.mjs',
      '.web.js',
      '.js',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json',
      '.web.jsx',
      '.jsx',
    ],
  },
};
module.exports = webpackConfig;
