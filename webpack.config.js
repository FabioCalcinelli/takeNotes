const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        // Updated configuration
        static: {
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true, // For React Router or Single Page Applications
        compress: true,
        port: 9000,
        proxy: [
            {
                context: ['/notes'],
                target: 'http://localhost:5000',
                secure: false,
            },
        ],
    },
    mode: 'development', // or 'production' if you're building for production
};

