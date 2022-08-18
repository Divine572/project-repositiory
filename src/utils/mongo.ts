import mongoose from 'mongoose'

const dbUri = config.get<string>('dbUri')

export default const connectDB = async () => {
    try{
        await mongoose.connect(dbUri)
        console.log('MONGODB database connected successfully....')
    } catch(err) {
        console.log('MONGODB database could not connect....')
        console.error(error)
        process.exit(1)

    }
}