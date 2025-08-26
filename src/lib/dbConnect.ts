import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = (global as any).mongoose || {};
(global as any).mongoose = connection;

const dbConnect = async () => {
    if(connection.isConnected) {
        console.log("Already connected to the database!");
        return ;
    }

    try {
      const db = await mongoose.connect(process.env.MONGODB_URI || "");
      connection.isConnected = db.connections[0].readyState;

      console.log("Connected to the database!");
    }
    catch(e) {
        console.error("database connection failed : " ,e);
    }
}

export default dbConnect;
