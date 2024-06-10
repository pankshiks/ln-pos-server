const mongoose = require('mongoose')

const URI = process.env.MONGO_URL
const db_name = process.env.DB_NAME

mongoose.connect(URI, {
    dbName: db_name
})
.then(() => {
    console.log('mongodb connected');    
})
.catch(err => console.log(err.message))


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
})
mongoose.connection.on('error', (err) => {
    console.log(err.message);
})
mongoose.connection.on('disconnected', () => {
    console.log('Moongose connecton is disconnected');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
