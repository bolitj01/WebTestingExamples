//Simple MongoDB test with Mocha + Chai
import {expect} from "chai"
import {MongoClient} from 'mongodb';
import {config} from "dotenv";
import {v4 as uuidv4} from 'uuid';
import {describe, it, before, after} from 'mocha';

describe('insert', function() {
  let connection;
  let db;
  let users;

  before(async function() {
    config();
    const remoteurl = "mongodb+srv://chester_the_tester:pfwcs537@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs";
    connection = new MongoClient(remoteurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db("mocha-test");
    users = db.collection("users");
    users.deleteMany({});
  });

  after(async function() {
    await users.deleteMany({});
    connection.close();
  });

  it('should insert a new user', async function() {
    this.retries(5);
    const mockUser = {_id: uuidv4(), name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: mockUser._id});
    expect(insertedUser).to.deep.equal(mockUser);
    //.deep.equal is equivalent to .eql
  });

  it("should insert and delete a user", async function() {
    const mockUser = {_id: uuidv4(), name: 'Tom'};
    await users.insertOne(mockUser);
    
    const insertedUser = await users.findOne({_id: mockUser._id});
    expect(insertedUser).to.deep.equal(mockUser);
    
    await users.deleteOne({_id: mockUser._id});
    const deletedUser = await users.findOne({_id: mockUser._id});
    expect(deletedUser).to.be.null;
  });

  it ("should insert and update a user", async function() {
    const mockUser = {_id: uuidv4(), name: 'Tim'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: mockUser._id});
    expect(insertedUser).to.deep.equal(mockUser);

    const updatedUser = {name: 'Timmy'};
    await users.updateOne({_id: mockUser._id}, {$set: updatedUser});

    const updatedInsertedUser = await users.findOne({_id: mockUser._id});
    expect(updatedInsertedUser.name).to.equal(updatedUser.name);
  });
});