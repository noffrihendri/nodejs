const env = process.env;


const config = {
    secretkey: 'noffrihendri&&',
    host: env.DB_HOST || 'localhost'
}

module.exports = config;