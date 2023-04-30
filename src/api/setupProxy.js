const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://admin.sajerbela.com/',
            changeOrigin: true,
        })
    );
};