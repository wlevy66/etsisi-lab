const mongoose = require('mongoose')

const connection = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/etsisi")
    } catch (error){
        throw new Error ('Cannot connect to the database')
    }
}

module.exports = connection