import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
    try {

        await mongoose.connect('mongodb+srv://anupamsynsoft:U3TAxrgOPZ3O2vr4@movielist.ra3fsnb.mongodb.net/movielist')
        console.log('Connected to MongoDB')
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1)
    }
}

export default connectDB
