import mongoose from "mongoose";
import * as Logs from "../utils/customLog.mjs";
import { ENV } from "./index.mjs";

try {
    // eslint-disable-next-line
    await mongoose.connect(ENV.mongoUrl);
    console.log(
        Logs.customSuccess.underline.bgMagenta(
            "Connected to database successfully!",
        ),
    );
    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));
} catch (error) {
    console.log(
        Logs.customError("Error while connecting to the database", error),
    );
    process.exit(1);
}
