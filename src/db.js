import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://maurovalenzuelatobar:FONuXSzp935fngSK@cluster0.otpdvqj.mongodb.net/')
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }

};
