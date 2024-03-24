const mongoose = require('mongoose')

const connection = async () => {
    try{
        await mongoose.connect("mongodb://mongo:27018/etsisi")

    } catch (error){
        console.log(error)
        throw new Error ('Cannot connect to the database')
    }
}

module.exports = connection