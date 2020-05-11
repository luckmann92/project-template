const path = require( 'path' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const config = {
    env: process.env.NODE_ENV || 'development',
    srcDir: path.resolve( __dirname, 'src/js' ),
};

module.exports = {
    mode: config.env,
    entry: './src/js/main.js',
    output: {
        filename: 'legacy-[name].js',
        path: path.resolve( __dirname, 'build/js' ),
        pathinfo: false,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [ config.srcDir ],
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                include: [ config.srcDir ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: '> 1%, last 2 versions, not dead',
                                    useBuiltIns: 'usage',
                                    loose: true,
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    optimization: {
        minimizer: [ new UglifyJsPlugin() ],
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [],
    resolve: {},
};
