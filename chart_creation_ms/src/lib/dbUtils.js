import mongoose from "mongoose";

// function to connect to the database asynchronously
export async function connectToDB(atlasUrl, dbName, maxRetries) {
    try {
        console.log(
            `Attempting to connect to the database (${maxRetries + 1} tr${
                maxRetries === 1 ? "y" : "ies"
            } remaining)`
        );
        await mongoose.connect(atlasUrl, { dbName });
    } catch {
        if (maxRetries > 0) {
            await connectToDB(atlasUrl, dbName, maxRetries - 1);
        } else {
            throw new Error("Could not connect to the database");
        }
    }
}
