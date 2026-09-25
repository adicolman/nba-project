import { MongoClient } from "mongodb";

// Si mongodb+srv:// falla con querySrv ECONNREFUSED en tu red,
// usar el formato non-SRV con los hosts del cluster:
//   mongodb://USER:PASSWORD@host1:27017,host2:27017,host3:27017/AH20232CP1?ssl=true&authSource=admin&appName=AH20232CP1
const MONGODB_URI = "mongodb+srv://admin:admin@nba.cmu5ixk.mongodb.net/?appName=nba";

const client = new MongoClient(MONGODB_URI);

export async function connectDB() {
  await client.connect();
  return client.db("AH20232CP1");
}

export function getDB() {
  return client.db("AH20232CP1");
}
