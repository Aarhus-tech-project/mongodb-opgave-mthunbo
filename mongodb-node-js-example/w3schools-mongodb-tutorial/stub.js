// W3schools MongoDB tutorial
// https://www.w3schools.com/mongodb/index.php

// Install Docker Desktop:
// winget install Docker.DockerDesktop

// Install Node.js:
// npm init -y
// npm install mongodb

// Run Docker Desktop:
// docker run --name mongodb -d -p 27017:27017 mongo:latest

// Run Node.js example:
// node stub.js

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'school';
const collectionName = 'students'

async function main() {
  
  // Connect to db
  try {
    await client.connect();
    console.log('Connected successfully to server');
  } catch (err) {
    console.error('CRITICAL: Could not connect to database.', err);
    return; 
  }

  // Db operations
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert one
async function createDemo(collection) {
  console.log("\n=== CREATE ===");

  // Insert one
  const insertOneResult = await collection.insertOne({
    name: "John Doe",
    age: 25,
    major: "Computer Science",
    semester: 3,
    gpa: 3.2,
    courses: ["Databases", "Algorithms"],
    createdAt: new Date(),
  });
  console.log("Inserted one ID:", insertOneResult.insertedId);

  // Insert many
  const insertManyResult = await collection.insertMany([
    {
      name: "Jane Smith",
      age: 22,
      major: "Computer Science",
      semester: 2,
      gpa: 3.8,
      courses: ["Databases", "Web Dev"],
      createdAt: new Date(),
    },
    {
      name: "Ali Khan",
      age: 27,
      major: "Business",
      semester: 4,
      gpa: 2.9,
      courses: ["Accounting", "Economics"],
      createdAt: new Date(),
    },
    {
      name: "Sofia Jensen",
      age: 24,
      major: "Business",
      semester: 1,
      gpa: 3.5,
      courses: ["Economics", "Marketing"],
      createdAt: new Date(),
    },
    {
      name: "Mikkel Larsen",
      age: 21,
      major: "Design",
      semester: 2,
      gpa: 3.1,
      courses: ["UX", "Typography"],
      createdAt: new Date(),
    },
    {
      name: "Emma Nguyen",
      age: 29,
      major: "Computer Science",
      semester: 5,
      gpa: 3.9,
      courses: ["AI", "Databases"],
      createdAt: new Date(),
    },
  ]);
  console.log("Inserted many count:", insertManyResult.insertedCount);
}


    // Read
    const findResult = await collection.findOne({ name: "John Doe" });
    console.log('Found document:', findResult);

  } catch (err) {
    console.error('Error: ', err);
  } finally {
    console.log('Closing connection...');
    await client.close();
  }
}

main();