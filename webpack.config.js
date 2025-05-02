// Webpack configuration file for building and serving the project
const path = require('path');

module.exports = {
  devServer: {
    port: 3002, // Port for webpack-dev-server (changed to 3002)
    hot: true, // Enable hot module replacement
    // open: true, // Uncomment to open browser automatically
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from 'public'
      publicPath: '/',
    },
    historyApiFallback: {
      // Route rewrites for SPA navigation
      rewrites: [
        // Routes starting with /park go to park.html
        { from: /^\/park(\/.*)?$/, to: '/park.html' },
        // Routes starting with /login, /register, /profile, /change-password go to auth.html
        { from: /^\/(login|register|profile|change-password)(\/.*)?$/, to: '/auth.html' },
        // All other routes go to space.html (your main app)
        { from: /./, to: '/space.html' }
      ],
      disableDotRule: true,
    },
    // Proxy configuration for WebSocket connections and backend API
    proxy: {
      // Proxy /app-ws requests to the Node.js server (port 3001 - backend)
      '/app-ws': {
        target: 'ws://localhost:3002', // Updated target port
        ws: true, // Enable WebSocket proxying
      },
      // Proxy /api requests to the Node.js backend server (port 3001)
      '/api': {
        target: 'http://localhost:3002', // Updated target port
        changeOrigin: true, // Needed for virtual hosted sites
        pathRewrite: { '^/api': '' }, // Rewrite path to remove /api prefix
      },
    },
  },
  entry: {
    index: './src/index.js', // Entry point for SpaceApp (space.html)
    park: './src/park.js',    // Entry point for ParkApp (park.html)
    auth: './src/auth.js'     // New entry point for AuthApp (auth.html)
  },
  output: {
    filename: '[name].bundle.js', // Output bundle filenames (index.bundle.js, park.bundle.js, auth.bundle.js)
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/, // Load CSS files
        use: ['style-loader', 'css-loader']
      }
      // Additional rules for images, fonts, etc. can be added here
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Resolve these extensions
  }
};
