import path from 'path'
import slsw from 'serverless-webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import { Configuration } from 'webpack'

const config: Configuration = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.json', '.ts'],
    alias: {
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { transpileOnly: true, configFile: 'tsconfig.json' },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: true,
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx}',
      },
    }),
  ],
}

module.exports = config
