import { MongoClient } from "mongodb";

// Copiar este archivo como db.js y completar con los datos reales de Atlas.
// db.js está en .gitignore: nunca se sube a GitHub.
//
// Si mongodb+srv:// falla con querySrv ECONNREFUSED en tu red,
// usar el formato non-SRV con los hosts del cluster:
//   mongodb://USER:PASSWORD@host1:27017,host2:27017,host3:27017/AH20232CP1?ssl=true&authSource=admin&appName=AH20232CP1
// (ver nslookup -type=SRV _mongodb._tcp.CLUSTER.mongodb.net)
const MONGODB_URI =
  "mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/AH20232CP1?appName=AH20232CP1";

const client = new MongoClient(MONGODB_URI);

export async function connectDB() {
  await client.connect();
  return client.db("AH20232CP1");
}

export function getDB() {
  return client.db("AH20232CP1");
}
