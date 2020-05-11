module.exports = {
    port: 3000,
    baseUrl: '/api',
    static: './build',
    rewriteRules: {
        '/:page/': '/:page.html',
    },
    customRoutes: {
        '/api/user/auth/': {
            method: 'post',
            handler: function( req, res ) {
                // Получение данных
                const data = req.body;

                // Имитация обработки
                const response = {
                    status: 'ok',
                    result: data,
                };

                // Передача данных
                return res.json( response );
            },
        },
    },
};
