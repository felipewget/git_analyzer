let config = {
    port: 8081,
    cors_whitelist: [
        'http://localhost:3000'
    ],
    mongo_db: {
        host: 'localhost',
        db_name: "dev_analyzer",
        port: 27017,
    },
    trial_balance: 45, // Initicial Balance to trial
}

export default config;