import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "iNotes-Backend",
    });
    console.log(connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
