
const mongoose = require("mongoose");

// Mock mongoose.connect to throw an error
mongoose.connect = async () => {
    throw new Error("Simulated DB Connection Error");
};

async function databaseConnection() {
    try {
        await mongoose.connect("mongodb://mock-uri");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed (caught inside):", error.message);
    }
}

console.log("Starting test...");
databaseConnection()
    .then(() => {
        console.log("Promise RESOLVED - This means the server WOULD start even with DB error.");
    })
    .catch((err) => {
        console.log("Promise REJECTED - This means the server would NOT start (correct behavior).", err);
    });
