const mongoose = require('mongoose')
require('dotenv').config()

const connectionDB = async () => {
    try {
        const dbHost = process.env.DB_HOST
        const dbPort = process.env.DB_PORT
        const dbName = process.env.DB_NAME

        await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)
    } catch (error) {
        throw new Error('No se pudo realizar la conexión a la base de datos')
    }
}

module.exports = connectionDB