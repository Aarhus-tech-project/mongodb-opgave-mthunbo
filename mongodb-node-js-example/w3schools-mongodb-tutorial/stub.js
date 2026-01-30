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

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbName = "school";
const collectionName = "students";

async function main() {
    // Connect to db
    try {
        await client.connect();
        console.log("Connected successfully to server");
    } catch (err) {
        console.error("CRITICAL: Could not connect to database.", err);
        return;
    }

    // Db operations
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Optional helper: prevents duplicate inserts each run
        async function resetCollection(collection) {
            await collection.deleteMany({});
        }

        // Insert Demo
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

        // Read Demo
        async function readDemo(collection) {
            console.log("\n=== READ ===");

            // Find one
            const john = await collection.findOne({ name: "John Doe" });
            console.log("FindOne John Doe:", john);

            // Find many by filter
            const csStudents = await collection.find({ major: "Computer Science" }).toArray();
            console.log(
                "CS students:",
                csStudents.map((s) => s.name)
            );

            // Projection (exclude _id, include only selected fields)
            const projection = await collection
                .find({}, { projection: { _id: 0, name: 1, major: 1, gpa: 1 } })
                .toArray();
            console.log("Projection (name, major, gpa):", projection);

            // Sort (by GPA descending)
            const sortedByGpa = await collection.find({}).sort({ gpa: -1 }).toArray();
            console.log(
                "Sorted by GPA desc:",
                sortedByGpa.map((s) => `${s.name} (${s.gpa})`)
            );

            // Comparison operator: age >= 25
            const age25Plus = await collection.find({ age: { $gte: 25 } }).toArray();
            console.log(
                "Age >= 25:",
                age25Plus.map((s) => s.name)
            );
        }

        // Update Demo
        async function updateDemo(collection) {
            console.log("\n=== UPDATE ===");

            // updateOne: set GPA for John Doe
            const updateOneResult = await collection.updateOne(
                { name: "John Doe" },
                { $set: { gpa: 3.4 } }
            );
            console.log(
                "updateOne matched/modified:",
                updateOneResult.matchedCount,
                updateOneResult.modifiedCount
            );

            // updateOne: add course (no duplicates)
            const addCourseResult = await collection.updateOne(
                { name: "John Doe" },
                { $addToSet: { courses: "Operating Systems" } }
            );
            console.log(
                "addToSet matched/modified:",
                addCourseResult.matchedCount,
                addCourseResult.modifiedCount
            );

            // updateMany: increment semester for all Business students
            const updateManyResult = await collection.updateMany(
                { major: "Business" },
                { $inc: { semester: 1 } }
            );
            console.log(
                "updateMany matched/modified:",
                updateManyResult.matchedCount,
                updateManyResult.modifiedCount
            );

            // Upsert example: insert if not exists
            const upsertResult = await collection.updateOne(
                { name: "New Student" },
                {
                    $setOnInsert: {
                        name: "New Student",
                        age: 20,
                        major: "Computer Science",
                        semester: 1,
                        gpa: 3.0,
                        courses: ["Intro Programming"],
                        createdAt: new Date(),
                    },
                },
                { upsert: true }
            );
            console.log("upsert upsertedId:", upsertResult.upsertedId ?? null);
        }

        // Delete Demo
        async function deleteDemo(collection) {
            console.log("\n=== DELETE ===");

            // deleteOne
            const deleteOneResult = await collection.deleteOne({ name: "Ali Khan" });
            console.log("deleteOne deleted:", deleteOneResult.deletedCount);

            // deleteMany
            const deleteManyResult = await collection.deleteMany({ gpa: { $lt: 3.0 } });
            console.log("deleteMany deleted:", deleteManyResult.deletedCount);
        }

        // ✅ Run your demos (this is what was missing)
        await resetCollection(collection); // comment out if not allowed by teacher
        await createDemo(collection);
        await readDemo(collection);
        await updateDemo(collection);
        await deleteDemo(collection);

        // Next step: we’ll add aggregation blocks here (after CRUD)
        // await aggBlock1(...); etc.
    } catch (err) {
        console.error("Error: ", err);
    } finally {
        console.log("Closing connection...");
        await client.close();
    }
}

main();
