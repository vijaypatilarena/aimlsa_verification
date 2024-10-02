// lib/mongodb.ts

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient; // Explicitly declare the type of client
let clientPromise: Promise<MongoClient>; // Explicitly declare the type of clientPromise

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to retain the MongoClient connection
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect(); // Type assertion to 'any'
  }
  clientPromise = (global as any)._mongoClientPromise; // Type assertion to 'any'
} else {
  // In production mode, create a new MongoClient for each connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect(); // Connect directly
}

export default clientPromise; // Export the promise
