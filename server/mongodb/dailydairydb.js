/** @format */

const { MongoClient } = require("mongodb");

async function dbConnect() {
  const uri = "mongodb+srv://dailyuser:DailyDairy565@dailydairycluster.oj0wdsh.mongodb.net/?retryWrites=true&w=majority";
  const dbClient = new MongoClient(uri);
  try {
    await dbClient.connect();
    await addUsername(dbClient, { username: "Test User" });
  } catch (error) {
    console.error(`There was an error connecting to the database: ${error}`);
  } finally {
    await dbClient.close();
  }
}

async function addUsername(client, newUser) {
  const createdUser = await client.db("DailyDatabase").collection("UserData").insertOne(newUser);
  console.log(`User ${createdUser.insertedUsername} was created successfully..!!`);
}

async function getUserByName(client, name) {
  const foundUser = await client.db("DailyDatabase").collection("UserData").findOne({ username: name });
  if (foundUser) {
    console.log(`Found user with username ${name}.`);
  } else {
    console.log(`No user with username ${name} found.`);
  }
}

module.exports = { dbConnect };
