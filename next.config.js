const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = phase => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username: 'sajal_doewan',
                mongodb_password: 'pass123',
                mongodb_cluster: 'shop',
                mongodb_database: 'nextjs-blog-dev',
            },
        }
    }

    return {
        env: {
            mongodb_username: 'sajal_doewan',
            mongodb_password: 'pass123',
            mongodb_cluster: 'shop',
            mongodb_database: 'nextjs-blog',
        },
    }
}
