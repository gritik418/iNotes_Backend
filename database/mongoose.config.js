const { connect } = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectToDB = async () => {
    try {
        const {connection} =  await connect(MONGO_URI, {
            dbName: "iNotes-Backend"
        });
        console.log(connection.host);
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDB