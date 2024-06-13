import mongoose, { ConnectOptions } from 'mongoose';

declare global {
    var _mongooseConnection: Promise<typeof mongoose> | null;
}

global._mongooseConnection = global._mongooseConnection || null;

export async function connect() {
    if (global._mongooseConnection) {
        return global._mongooseConnection;
    }

    try {
        const mongooseConnection = mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Adjust the pool size as needed
        } as ConnectOptions);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });

        global._mongooseConnection = mongooseConnection;
        return mongooseConnection;

    } catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
}
